export function errorInputCheck(element: HTMLInputElement | null) {
    if (!element) return;
    if (element.value === '') {
        element.focus();
    }
}
