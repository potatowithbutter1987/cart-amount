export type detailItem  = {
	name: string;
	qty?: number;
	amount: number;
};

export type detail = {
	items: detailItem[];
	tax: number;
	totalAmount: number;
};