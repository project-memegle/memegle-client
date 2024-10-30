export async function copyImgToClipboard(imgUrl: string): Promise<void> {
    try {
        const data = await fetch(imgUrl);
        const blob = await data.blob();

        if (!('ClipboardItem' in window)) {
            throw new Error(
                'Clipboard API with ClipboardItem is not supported on this browser.'
            );
        }

        // 이미지 타입이 지원되지 않는 경우 PNG로 변환
        const canvas = document.createElement('canvas');
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);

        await new Promise<void>((resolve, reject) => {
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob(async (pngBlob) => {
                        if (pngBlob) {
                            await navigator.clipboard.write([
                                new ClipboardItem({
                                    'image/png': pngBlob,
                                }),
                            ]);
                            console.log('Image copied to clipboard.');
                            resolve();
                        } else {
                            reject(
                                new Error('Failed to convert image to PNG.')
                            );
                        }
                    }, 'image/png');
                } else {
                    reject(new Error('Failed to get canvas context.'));
                }
            };
            img.onerror = () => reject(new Error('Failed to load image.'));
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.name} - ${error.message}`);
        } else {
            console.error('An unknown error occurred');
        }
    }
}
