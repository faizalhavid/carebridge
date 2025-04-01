export interface BaseEntity {
    id?: number | string | null;
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    isDeleted?: boolean | null;
    deleteAt?: Date | string | null;
}