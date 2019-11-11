// Imports
import { Entity, Column } from "typeorm";
import EntityBase from "./EntityBase";

// Entity
@Entity("books")
export default class Book extends EntityBase {
    @Column({ nullable: false })
    public title!: string;

    @Column({ nullable: false })
    public author!: string;

    @Column({ nullable: true, default: null })
    public genre!: string | null;

    @Column({ nullable: true, default: null })
    public year!: number | null;
}
