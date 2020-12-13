import { ViewEntity, ViewColumn } from 'typeorm';

/** Поле cost по умолчанию умножается на 10% */
@ViewEntity({
    expression: `
    --sql
        select
            distinct on(p."goodId")
            g.id,
            g.name,
            p.cost,
            p.date,
            d.vendor
        from good g
        left join description d on d."goodId" = g.id
        left join price p on p."goodId" = g.id
        where p.date <= current_timestamp
        order by p."goodId", p.date desc;
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
    date!: string;

    @ViewColumn()
    vendor!: string;
}
