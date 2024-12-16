export function normalizeString(str: string): string {
    return str.normalize('NFC').toLowerCase();
}
