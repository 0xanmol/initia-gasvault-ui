export const parseAmount = (amount: number) => {
    return BigInt(amount * 10 ** 18);
    }