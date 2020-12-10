import { Good } from "@good/entities/good.entity";
import { Margin } from "@good/margin/entities/margin.entity";
import { Discount } from "@good/discount/entities/discount.entity";
import { Quantity } from "@good/quantity/entities/quantity.entity";
import { Price } from "@good/price/entities/price.entity";

export interface IOrderReduce {
    good: Good[];
    price: Price[];
    margin: Margin[];
    discount: Discount[];
    quantity: Quantity[];
    push: (items: IOrderReduceArr) => IOrderReduce;
}

export type IOrderReduceArr = [Good, Price, Margin, Discount, Quantity];
