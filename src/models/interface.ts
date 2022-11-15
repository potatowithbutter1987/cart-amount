export interface detailItem {
	name: string;
	qty: number;
	amount: number;
}

export interface detail {
	items: detailItem[];
	tax: number;
	totalAmount: number;
}