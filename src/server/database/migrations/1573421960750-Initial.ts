// Imports
import { MigrationInterface, QueryRunner, Table } from "typeorm";

// Migrations
export class Initial1573421960750 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create book table instance
        const bookTable = new Table({
            // Table name
            name: "books",

            // Column setup
            columns: [
                {
                    // Column name
                    name: "id",

                    // Column type
                    type: "varchar",

                    // Max length
                    length: "120",

                    // Primary key
                    isPrimary: true,

                    // Not nullable
                    isNullable: false,
                },
                {
                    // Column name
                    name: "title",

                    // Column type
                    type: "varchar",

                    // Not nullable
                    isNullable: false,
                },
                {
                    // Column name
                    name: "author",

                    // Column type
                    type: "varchar",

                    // Not nullable
                    isNullable: false,
                },
                {
                    // Column name
                    name: "genre",

                    // Column type
                    type: "varchar",

                    // Nullable
                    isNullable: true,
                },
                {
                    // Column name
                    name: "year",

                    // Column type
                    type: "integer",

                    // Nullable
                    isNullable: true,
                },
                {
                    // Column name
                    name: "createdAt",

                    // Column type
                    type: "datetime",

                    // Default value
                    default: "datetime('now')",

                    // Not nullable
                    isNullable: false,
                },
                {
                    // Column name
                    name: "updatedAt",

                    // Column type
                    type: "datetime",

                    // Default value
                    default: "datetime('now')",

                    // Not nullable
                    isNullable: false,
                },
            ],
        });

        // Create table in database
        await queryRunner.createTable(bookTable);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Find book table
        const bookTable = await queryRunner.getTable("book");

        // If table was found,
        if (!!bookTable) {
            // Drop table
            await queryRunner.dropTable(bookTable);
        }
    }
}
