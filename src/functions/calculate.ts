import { TAX, ITEM_LIST } from "../config/constant";
import { detailItem, detail } from "../models/interface";

export class Calculate {
	private detailItems: detailItem[] = [];

	public getCartAmount(itemData: string): object {
		const detailItems = this.getDetailItems(itemData);
		const result = this.getResult(detailItems);

		return result;
	}

	private getDetailItems(itemData: string): detailItem[] {
		const itemNames = itemData.split(/\r\n|\n/).filter((f) => f !== "");

		for (const itemName of itemNames) {
			const item = ITEM_LIST.filter((i) => i.name === itemName);

			this.addDetailItem(item, itemName);
		}
		return this.detailItems;
	}

	private addDetailItem(item: detailItem[], itemName: string): void {
		if (this.existsList(item)) {
			const copyItem = { ...item[0] };
			const detailItem = this.detailItems.filter((d) => d.name === copyItem.name);
			if (this.existsList(detailItem)) {
				detailItem[0].qty = ++detailItem[0].qty;
				detailItem[0].amount = detailItem[0].qty * copyItem.amount;
			} else {
				++copyItem.qty;
				this.detailItems.push(copyItem);
			}
		} else {
			this.detailItems.push({
				name: itemName,
				qty: 1,
				amount: 0,
			});
		}
	}

	private existsList(items: any[]): number {
		return items.length;
	}

	private getResult(detailItems: detailItem[]): detail {
		const result: detail = {
			items: detailItems,
			tax: 0,
			totalAmount: 0,
		};

		const totalWithoutTax = this.calcTotalWithoutTax(detailItems);
		result.tax = this.calcTax(totalWithoutTax);
		result.totalAmount = totalWithoutTax + result.tax;

		return result;
	}

	private calcTotalWithoutTax(detailItems: detailItem[]): number {
		let amountTotal: number = 0;
		for (const item of detailItems) {
			amountTotal += item.amount;
		}
		return amountTotal;
	}

	private calcTax(num: number): number {
		return Math.floor(num * TAX.CONSUMPTION);
	}
}
