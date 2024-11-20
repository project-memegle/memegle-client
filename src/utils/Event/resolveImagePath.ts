// export const resolveImagePath = (path: string) =>
//     new URL(path, import.meta.url).pathname;

const resolveImagePath = (path: string) => {
    return `/assets/images/${path}`;
};

export default resolveImagePath;
