import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1747853998404 implements MigrationInterface {
    name = 'Init1747853998404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id_customer" SERIAL NOT NULL, "document_number" character varying(15) NOT NULL, "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "gender" boolean NOT NULL, "email" character varying(250), CONSTRAINT "UQ_badc729229b32ff6ada29d46584" UNIQUE ("document_number"), CONSTRAINT "PK_46f6dd0d95f8b022dda93119649" PRIMARY KEY ("id_customer"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
