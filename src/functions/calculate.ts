import { TAX, ITEM_LIST } from "../config/constant";
import { detailItem, detail } from "../models/interface";

export class Calculate {
	#detailItems: detailItem[] = [];

	public getCartAmount(itemData: string): object {
		const detailItems = this.getDetailItems(itemData);
		const result = this.getResult(detailItems);

		return result;
	}

	private getDetailItems(itemData: string): detailItem[] {
		const itemNames = itemData.split(/\r\n|\n/).filter((f) => f !== "");

		const detailItems: detailItem[] = [];
		for (const itemName of itemNames) {
			const item = ITEM_LIST.filter((i) => i.name === itemName);

			if (this.existsList(item)) {
				const copyItem = {...item[0]};
				const detailItem = detailItems.filter((d) => d.name === copyItem.name);
				if (this.existsList(detailItem)) {
					detailItem[0].qty = ++detailItem[0].qty;
					detailItem[0].amount = detailItem[0].qty * copyItem.amount;
				} else {
					++copyItem.qty;
					detailItems.push(copyItem);
				}
			} else {
				detailItems.push({
					name: itemName,
					qty: 1,
					amount: 0,
				});
				// this.#addDetailItems({
				//     name: itemName,
				//     qty: 1,
				//     amount: 0,
				// });
			}
		}
		return detailItems;
	}

	private existsList(items: any[]): number {
		return items.length;
	}

	//   #addDetailItems(detailItem:detailItem):void {
	//     this.#detailItems.push(detailItem);
	//   }

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
