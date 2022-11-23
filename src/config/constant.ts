export const TAX = {
    CONSUMPTION: 0.08
} as const;

export const DISCOUNT = {
    BUY_BULK_3: 0.1
} as const;

export const ITEM_LIST = [
    {
        name: 'りんご',
        qty: 0,
        amount: 198
    },
    {
        name: 'みかん',
        qty: 0,
        amount: 98
    },
    {
        name: 'すいか',
        qty: 0,
        amount: 498
    }
] as const;
