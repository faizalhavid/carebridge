import { DeviceInfo } from "@/types/models/device-info";
import { get, post } from "../axios";
import { getDeviceInfo } from "../../utils/get-device-info";
import { SuccessResponse } from "@/types/api";

class AuthService {
    private static deviceToken = "1234567890";

    public static async login(email: string, password: string): Promise<SuccessResponse<{ user: any; accessToken: string; }>> {
        const deviceInfo: DeviceInfo = {
            ...getDeviceInfo(),
            deviceToken: this.deviceToken,
            ipAddress: "",
        };

        return post('/auth/login', { email, password, deviceInfo });
    }

    public static async registerEmail(email: string): Promise<SuccessResponse<{ message: string }>> {
        return post('/auth/register-email', { email });
    }

    public static async verification(email: string, otp: string): Promise<SuccessResponse<{ message: string }>> {
        return post('/auth/verification', { email, otp });
    }

    public static async registerBiodata(data: any): Promise<SuccessResponse<{ message: string }>> {
        return post('/auth/register-account', data);
    }

    public static async logout(): Promise<SuccessResponse<{ message: string }>> {
        return post('/auth/logout', { deviceToken: this.deviceToken });
    }

    public static async refreshToken(): Promise<SuccessResponse<{ accessToken: string }>> {
        return post('/auth/refresh-token');
    }

}

export default AuthService;