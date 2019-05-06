export const getRandomNumber = (): number => {
    const min = Math.ceil(Number.MIN_VALUE);
    const max = Math.ceil(Number.MAX_VALUE);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
