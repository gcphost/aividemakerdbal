import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ValueTransformer,
} from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { encrypt, decrypt } from "../utils/secure-crypto";

/**
 * Value transformer for encrypting/decrypting JSON system usage data
 */
const systemUsageTransformer: ValueTransformer = {
  to: (value: any): string | null => {
    // Encrypt when saving to database
    if (value === null || value === undefined) {
      return null;
    }
    // If value is already encrypted (contains colons from iv:encrypted:authTag format), don't re-encrypt
    if (typeof value === "string" && value.includes(":") && value.split(":").length === 3) {
      return value;
    }
    return encrypt(JSON.stringify(value));
  },
  from: (value: string | null): any => {
    // Decrypt when reading from database
    if (value === null || value === undefined) {
      return null;
    }
    // If value doesn't look encrypted (no colons), return as-is
    if (!value.includes(":")) {
      return value;
    }
    try {
      const decrypted = decrypt(value);
      return JSON.parse(decrypted);
    } catch (error: any) {
      // Decryption failed - likely encryption key mismatch (e.g., moved to different machine)
      console.warn(
        `[Settings] Failed to decrypt system usage: ${error.message}. This usually means the encryption key changed (e.g., moved to different machine).`
      );
      return null;
    }
  },
};

@Entity("settings")
export class Settings extends BaseEntity {
  @PrimaryColumn("varchar")
  _id!: string;

  @Column("varchar")
  userId!: string;

  @Column("varchar", { nullable: true })
  theme?: string;

  @Column({ type: "boolean", default: true })
  notifications!: boolean;

  @Column({ type: "boolean", default: true })
  emailNotifications!: boolean;

  @Column("varchar", { default: "en" })
  language!: string;

  @Column("varchar", { default: "UTC" })
  timezone!: string;

  @Column({ type: "text", nullable: true })
  preferences?: string;

  @Column("varchar", { nullable: true, transformer: systemUsageTransformer })
  systemUsage?: any; // Encrypted JSON: { totalVideosCreated, totalFilesCreated, maxVideos: 5, maxFiles: 100 }

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
