import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1748187122603 implements MigrationInterface {
    name = 'Init1748187122603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id_user" SERIAL NOT NULL, "id_branch" integer NOT NULL, "user_name" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(150) NOT NULL, "phone" character varying(20), "token" character varying(255), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9664961c0264d34a3cf82b11700" PRIMARY KEY ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id_payment" SERIAL NOT NULL, "id_company_plan" integer NOT NULL, "amount" numeric(10,2) NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "due_date" date NOT NULL, "cutoff_date" date NOT NULL, "status" character varying NOT NULL, "payment_date" date, "method" character varying, "reference" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_49d32119980bcb196e94debc25c" PRIMARY KEY ("id_payment"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id_company" SERIAL NOT NULL, "ruc" character varying(20) NOT NULL, "legal_name" character varying(150) NOT NULL, "email" character varying(150) NOT NULL, "phone" character varying(20) NOT NULL, "logo" character varying(255), "second_user_sunat" character varying(100), "second_password_sunat" character varying(100), "db_name" character varying(100) NOT NULL, "is_delinquent" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "id_admin_user" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3cfb3efea34454bc843324000db" PRIMARY KEY ("id_company"))`);
        await queryRunner.query(`CREATE TABLE "plan" ("id_plan" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "price" numeric(10,2) NOT NULL, "features" json, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_021e68a56f01f6f61d8c0203c5d" PRIMARY KEY ("id_plan"))`);
        await queryRunner.query(`CREATE TABLE "branch" ("id_branch" SERIAL NOT NULL, "id_company" integer NOT NULL, "trade_name" character varying(100) NOT NULL, "address" character varying(255), "geo_code" character varying(10), "department" character varying(100), "province" character varying(100), "district" character varying(100), "urbanization" character varying(100), "annex_code" character varying(10), "phone" character varying(20), "email" character varying(150), "is_main" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "id_admin_user" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e33b0c461924981ec27fca8a872" PRIMARY KEY ("id_branch"))`);
        await queryRunner.query(`CREATE TABLE "company_plan" ("id_company_plan" SERIAL NOT NULL, "id_company" integer NOT NULL, "id_plan" integer NOT NULL, "description" character varying, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_953e06592a46372c452bf47e471" PRIMARY KEY ("id_company_plan"))`);
        await queryRunner.query(`CREATE TABLE "admin_user" ("id" SERIAL NOT NULL, "user_name" character varying(150) NOT NULL, "name" character varying(250) NOT NULL, "last_name" character varying(250) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(250) NOT NULL, "role" character varying NOT NULL DEFAULT 'admin', "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_489329ab9272a53443fc29f5908" UNIQUE ("user_name"), CONSTRAINT "UQ_840ac5cd67be99efa5cd989bf9f" UNIQUE ("email"), CONSTRAINT "PK_a28028ba709cd7e5053a86857b4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admin_user"`);
        await queryRunner.query(`DROP TABLE "company_plan"`);
        await queryRunner.query(`DROP TABLE "branch"`);
        await queryRunner.query(`DROP TABLE "plan"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
