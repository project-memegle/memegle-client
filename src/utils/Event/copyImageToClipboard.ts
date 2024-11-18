export async function copyImgToClipboard(imgUrl: string): Promise<void> {
    try {
        const data = await fetch(imgUrl);
        const blob = await data.blob();

        if (!('ClipboardItem' in window)) {
            throw new Error(
                'Clipboard API with ClipboardItem is not supported on this browser.'
            );
        }

        const pngBlob = await convertImageToPngBlob(blob);
        await writeToClipboard(pngBlob);
    } catch (error) {
        handleError(error);
    }
}

async function convertImageToPngBlob(blob: Blob): Promise<Blob> {
    return new Promise<Blob>((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((pngBlob) => {
                    if (pngBlob) {
                        resolve(pngBlob);
                    } else {
                        reject(new Error('Failed to convert image to PNG.'));
                    }
                }, 'image/png');
            } else {
                reject(new Error('Failed to get canvas context.'));
            }
        };

        img.onerror = () => reject(new Error('Failed to load image.'));
    });
}

async function writeToClipboard(blob: Blob): Promise<void> {
    await navigator.clipboard.write([
        new ClipboardItem({
            'image/png': blob,
        }),
    ]);
}

function handleError(error: unknown): void {
    if (error instanceof Error) {
        console.error(`Error: ${error.name} - ${error.message}`);
    } else {
        console.error('An unknown error occurred');
    }
}
