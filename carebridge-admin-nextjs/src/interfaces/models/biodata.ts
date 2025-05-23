import { BaseEntity } from "./base-entity";

export interface Biodata extends BaseEntity {
    id: number;
    fullName: string;
    address: string;
}
