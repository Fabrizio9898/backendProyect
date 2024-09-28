import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1727475688142 implements MigrationInterface {
    name = 'Initial1727475688142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying NOT NULL DEFAULT 'default-image-url.jpg', "categoryId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "order_id" uuid, CONSTRAINT "REL_a6ac5c99b8c02bd4ee53d3785b" UNIQUE ("order_id"), CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "userId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_order_details_order_detail" ("productId" uuid NOT NULL, "orderDetailId" uuid NOT NULL, CONSTRAINT "PK_d8bbde5b3949a4cb4b4216fc75e" PRIMARY KEY ("productId", "orderDetailId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f9e45d7e9aa0a0cd272c5f6639" ON "product_order_details_order_detail" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b8db4b713c36dd5a834edc9128" ON "product_order_details_order_detail" ("orderDetailId") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_a6ac5c99b8c02bd4ee53d3785be" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_order_details_order_detail" ADD CONSTRAINT "FK_f9e45d7e9aa0a0cd272c5f6639b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_order_details_order_detail" ADD CONSTRAINT "FK_b8db4b713c36dd5a834edc9128d" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_order_details_order_detail" DROP CONSTRAINT "FK_b8db4b713c36dd5a834edc9128d"`);
        await queryRunner.query(`ALTER TABLE "product_order_details_order_detail" DROP CONSTRAINT "FK_f9e45d7e9aa0a0cd272c5f6639b"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_a6ac5c99b8c02bd4ee53d3785be"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b8db4b713c36dd5a834edc9128"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f9e45d7e9aa0a0cd272c5f6639"`);
        await queryRunner.query(`DROP TABLE "product_order_details_order_detail"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "order_detail"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
