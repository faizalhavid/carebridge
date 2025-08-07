import { BaseEntity } from "./base-entity";

export interface DeviceInfo extends Omit<BaseEntity, 'id'> {
    id?: string;
    deviceType: string;
    operatingSystem: string;
    osVersion: string;
    browser: string;
    browserVersion: string;
    deviceToken: string;
    ipAddress: string;
}