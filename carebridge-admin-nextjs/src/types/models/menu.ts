import { BaseEntity } from "./base-entity";
import { Role } from "./user";

export interface Menu extends BaseEntity {
    name: string;
    url: string;
    parentId: number | null;
    parent?: Menu;
    children?: Menu[];
    smallIcon: string;
    bigIcon: string;
}

export interface MenuRole extends BaseEntity {
    menuId: number;
    menu?: Menu;
    roleId: number;
    role?: Role;
}
