import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    expression: `
        select
            g.id,
            g.name,
            p.cost,
            d.discount,
            m.margin,
            de.vendor,
            de.description
        from good g
        left join price p on g.id = p."goodId"
        left join discount d on g.id = d."goodId"
        left join margin m on g.id = m."goodId"
        left join description de on g.id = de."goodId"
    `
})
export class GoodView {
    @ViewColumn()
    id!: string;

    @ViewColumn()
    name!: string;

    @ViewColumn()
    cost!: number;

    @ViewColumn()
    discount!: number;

    @ViewColumn()
    margin!: number;

    @ViewColumn()
    vendor!: string;

    @ViewColumn()
    description!: string;
}
