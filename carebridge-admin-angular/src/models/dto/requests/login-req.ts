import { DeviceInfo } from "../../device-info";

export interface LoginRequest {
    username: string;
    password: string;
    deviceInfo: DeviceInfo;
}