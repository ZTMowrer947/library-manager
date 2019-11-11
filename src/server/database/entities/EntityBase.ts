// Import
import crypto from "crypto";
import base32 from "hi-base32";
import {
    BeforeInsert,
    CreateDateColumn,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";

// Entity base
abstract class EntityBase {
    @PrimaryColumn({ length: 120, nullable: false, unique: true })
    public id!: string;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;

    @BeforeInsert()
    private generateId(): void {
        // Generate 15 random bytes (120 bits)
        const bytes = crypto.randomBytes(15);

        // Encode bytes as base32
        const encoded = base32.encode(bytes);

        // Store encoded bytes as entity ID
        this.id = encoded;
    }
}

// Export
export default EntityBase;
