export interface BaseEntity {
    id: string | number;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    isDeleted?: boolean | null;
    deleteAt?: Date | string | null;
}