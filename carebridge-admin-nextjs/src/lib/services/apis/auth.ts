import { DeviceInfo } from "@/types/models/device-info";
import { get, post } from "../axios";
import { getDeviceInfo } from "../../utils/get-device-info";
import { SuccessResponse } from "@/types/api";


const deviceToken = "1234567890";

export function login(email: string, password: string): Promise<SuccessResponse<{ user: any; accessToken: string; }>> {
    const deviceInfo: DeviceInfo = {
        ...getDeviceInfo(),
        deviceToken: deviceToken,
        ipAddress: "",
    };

    return post('/auth/login', { email, password, deviceInfo });
}

export function registerEmail(email: string): Promise<SuccessResponse<{ message: string }>> {
    return post('/auth/register-email', { email });
}

export function verification(email: string, otp: string): Promise<SuccessResponse<{ message: string }>> {
    return post('/auth/verification', { email, otp });
}

export function registerBiodata(data: any): Promise<SuccessResponse<{ message: string }>> {
    return post('/auth/register-account', data);
}

export function logout(): Promise<SuccessResponse<{ message: string }>> {
    return post('/auth/logout', { deviceToken: deviceToken });
}

export function refreshToken(): Promise<SuccessResponse<{ accessToken: string }>> {
    return post('/auth/refresh-token');
}
