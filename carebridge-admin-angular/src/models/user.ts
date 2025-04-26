import { Authority } from "./authority";
import { BaseEntity } from "./base-entity";
import { Biodata } from "./biodata";
import { DeviceInfo } from "./device-info";


export interface Role extends BaseEntity {
    id: number;
    name: string;
    description: string;
}

export interface User extends BaseEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    loginAttempt: number;
    isLocked: boolean;
    lastLogin: Date;
    deviceInfo: DeviceInfo[];
    authority: Authority[];
    role: Role;
    biodata: Biodata;
}

