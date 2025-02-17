import { Authority } from "./authority";
import { Biodata } from "./biodata";
import { DeviceInfo } from "./device-info";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    loginAttempt: number;
    isLocked: boolean;
    lastLogin: Date;
    isDeleted: boolean;
    createdAt: Date;
    deviceInfo: DeviceInfo[];
    authority: Authority[];


    role: string;
    biodata: Biodata;

}
