import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1749697741685 implements MigrationInterface {
    name = 'Init1749697741685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "igv" numeric(4,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "igv"`);
    }

}
