import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
        const targetItem = this.getItem(item.id);
        if (targetItem) {
            if(targetItem.quantity) targetItem.quantity += 1;
        } else this._items.push(item);
    }

    delItem(id: number): void {
        const targetItem = this.getItem(id);
        if (targetItem) {
            if(targetItem.quantity && targetItem.quantity > 1) targetItem.quantity -= 1;
            else this._items.splice(this._items.findIndex((item) => item.id === id) , 1);
        }
    }

    getItem(id: number): Buyable | undefined {
        return this._items.find((currItem) => currItem.id === id);
    }

    get items(): Buyable[] {
        return [...this._items]; 
    }

    getTotalCost(): number {
        return this._items.reduce((acc, el) => el.price + acc, 0);
    }
    getTotalCostIncludingDiscounts(discount: number): number {
        return ((100 - discount) / 100) * this.getTotalCost();
    }
}