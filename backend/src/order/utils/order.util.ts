import { Discount } from "@good/discount/entities/discount.entity";
import { Good } from "@good/entities/good.entity";
import { Margin } from "@good/margin/entities/margin.entity";
import { Price } from "@good/price/entities/price.entity";
import { Quantity } from "@good/quantity/entities/quantity.entity";
import { IOrderReduceArr } from "@order/interfaces";

/**
 * Проверка прав на изменеие заказа
 * @param group
 */
export const checkGroup = (group: string[]) => (role: string) => group.some(
    (item) => (item === role)
);

/** Аккумулятор для создания/обновления заказа */
export class OrderAccumulator {
    good: Good[] = [];
    price: Price[] = [];
    margin: Margin[] = [];
    discount: Discount[] = [];
    quantity: Quantity[] = [];

    static create() {
        return new OrderAccumulator();
    }

    push([good, price, margin, disc, qty]: IOrderReduceArr) {
        this.good.push(good);
        this.price.push(price);
        this.margin.push(margin);
        this.discount.push(disc);
        this.quantity.push(qty);

        return this;
    }
}
