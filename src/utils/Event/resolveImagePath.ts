export const resolveImagePath = (path: string) =>
    new URL(path, import.meta.url).pathname;

export default resolveImagePath;
