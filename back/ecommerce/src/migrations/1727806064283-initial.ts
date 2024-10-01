import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1727806064283 implements MigrationInterface {
    name = 'Initial1727806064283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "phone" integer NOT NULL, "country" character varying(50), "address" text, "city" character varying(50), "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "userId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric(10,2) NOT NULL, "order_id" uuid, CONSTRAINT "REL_a6ac5c99b8c02bd4ee53d3785b" UNIQUE ("order_id"), CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying NOT NULL DEFAULT 'default-image-url.jpg', "categoryId" uuid, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_order_detail" ("product_id" uuid NOT NULL, "order_detail_id" uuid NOT NULL, CONSTRAINT "PK_61865c3b4d652ea1bab1250a04c" PRIMARY KEY ("product_id", "order_detail_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7efebfdbd6560ad4e6f2ac4e1e" ON "product_order_detail" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_88947597545e8442d04656d8f5" ON "product_order_detail" ("order_detail_id") `);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_detail" ADD CONSTRAINT "FK_a6ac5c99b8c02bd4ee53d3785be" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_order_detail" ADD CONSTRAINT "FK_7efebfdbd6560ad4e6f2ac4e1ed" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_order_detail" ADD CONSTRAINT "FK_88947597545e8442d04656d8f58" FOREIGN KEY ("order_detail_id") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_order_detail" DROP CONSTRAINT "FK_88947597545e8442d04656d8f58"`);
        await queryRunner.query(`ALTER TABLE "product_order_detail" DROP CONSTRAINT "FK_7efebfdbd6560ad4e6f2ac4e1ed"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "order_detail" DROP CONSTRAINT "FK_a6ac5c99b8c02bd4ee53d3785be"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_88947597545e8442d04656d8f5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7efebfdbd6560ad4e6f2ac4e1e"`);
        await queryRunner.query(`DROP TABLE "product_order_detail"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "order_detail"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
