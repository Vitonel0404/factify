import { MigrationInterface, QueryRunner } from "typeorm";

export class InitBdRoot1748058286251 implements MigrationInterface {
    name = 'InitBdRoot1748058286251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id_user" SERIAL NOT NULL, "id_branch" integer NOT NULL, "user_name" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "email" character varying(150) NOT NULL, "phone" character varying(20), "token" character varying(255), "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9664961c0264d34a3cf82b11700" PRIMARY KEY ("id_user"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id_company" SERIAL NOT NULL, "ruc" character varying(20) NOT NULL, "legal_name" character varying(150) NOT NULL, "email" character varying(150) NOT NULL, "phone" character varying(20) NOT NULL, "logo" character varying(255), "second_user_sunat" character varying(100), "second_password_sunat" character varying(100), "db_name" character varying(100) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3cfb3efea34454bc843324000db" PRIMARY KEY ("id_company"))`);
        await queryRunner.query(`CREATE TABLE "branch" ("id_branch" SERIAL NOT NULL, "id_company" integer NOT NULL, "trade_name" character varying(100) NOT NULL, "address" character varying(255), "geo_code" character varying(10), "department" character varying(100), "province" character varying(100), "district" character varying(100), "urbanization" character varying(100), "annex_code" character varying(10), "phone" character varying(20), "email" character varying(150), "is_main" boolean NOT NULL DEFAULT false, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e33b0c461924981ec27fca8a872" PRIMARY KEY ("id_branch"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "branch"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
