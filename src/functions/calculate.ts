import { TAX, DISCOUNT, ITEM_LIST } from "../config/constant";
import { detailItem, detail } from "../models/interface";

export class Calculate {
	private detailItems: detailItem[] = [];

	public getCartAmount(itemData: string): object {
		const detailItems = this.getDetailItems(itemData);
		const detailItemsWithDiscount = this.addDiscountForDetailItem(detailItems);
		const result = this.getResult(detailItemsWithDiscount);

		return result;
	}

	private getDetailItems(itemData: string): detailItem[] {
		const itemNames = itemData.split(/\r\n|\n/).filter((f) => f !== "");

		for (const itemName of itemNames) {
			const masterItem = ITEM_LIST.filter((i) => i.name === itemName);
			this.addDetailItem(masterItem, itemName);
		}
		return this.detailItems;
	}

	private addDetailItem(masterItem: detailItem[], itemName: string): void {
		if (this.existsList(masterItem)) { // マスターに存在する商品
			const copyItem = { ...masterItem[0] };
			const detailItem = this.detailItems.filter((d) => d.name === copyItem.name);
			if (this.existsList(detailItem)) {
				detailItem[0].qty = ++detailItem[0].qty!;
				detailItem[0].amount = detailItem[0].qty * copyItem.amount;
				return;
			}

			++copyItem.qty!;
			this.detailItems.push(copyItem);
		} else { // マスターに存在しない商品
			const detailItem = this.detailItems.filter((d) => d.name === itemName);
			if (this.existsList(detailItem)) {
				// detailItem[0].qty = ++detailItem[0].qty;
				return;
			}
			this.detailItems.push({
				name: itemName,
				qty: 1,
				amount: 0,
			});
		}
	}

	private addDiscountForDetailItem(detailItems: detailItem[]): detailItem[] {
		const result = [];
		for (const detailItem of detailItems) {
			if (detailItem.qty! >= 3 ) {
				result.push(detailItem);

				// 10%割引
				const calcDiscrount = Math.floor(detailItem.amount! * DISCOUNT.BUY_BULK_3) * -1;
				result.push({
					name: `${detailItem.name}まとめ買い割引`,
					amount: calcDiscrount,
				});
				continue;
			}
			result.push(detailItem);
		}
		
		return result;
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
