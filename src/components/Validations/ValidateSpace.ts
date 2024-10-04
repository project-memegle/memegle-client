export default function ValidateSpace(value: string): string {
    return value.replace(/\s+/g, '');
}
