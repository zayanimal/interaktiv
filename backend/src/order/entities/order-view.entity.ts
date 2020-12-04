import { ViewEntity, ViewColumn, Connection } from 'typeorm';

@ViewEntity({
    expression: `
        SELECT
            "o"."id" AS "id",
            "o"."orderId" AS "orderId",
            "o"."created" AS "created",
            "u"."username" AS "username",
            "c"."name" AS "company",
            "e"."name" AS "enduser",
            "s"."status" AS "status"
        FROM "order" "o"
        LEFT JOIN "users" "u"
        ON "u"."id"="o"."userId"
        LEFT JOIN "company" "c"
        ON "c"."id"="o"."companyId"
        LEFT JOIN "enduser" "e"
        ON "e"."id"="o"."enduserId"
        LEFT JOIN "order_status" "s"
        ON "s"."id"="o"."statusId"
    `
})
export class OrderView {
    @ViewColumn()
    id!: string;

    @ViewColumn()
    orderId!: number;

    @ViewColumn()
    created!: string;

    @ViewColumn()
    username!: string;

    @ViewColumn()
    company!: string;

    @ViewColumn()
    enduser!: string;

    @ViewColumn()
    status!: number;
}
