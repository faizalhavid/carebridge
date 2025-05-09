import { DeviceInfo } from "@/interfaces/models/device-info";
import { fetcher } from "../utils/fetcher";
import { getDeviceInfo } from "../utils/get-device-info";
import { SuccessResponse } from "@/interfaces/server-res";

class AuthService {
    private static deviceToken = "1234567890";

    public static async login(email: string, password: string): Promise<SuccessResponse<{ user: any; accessToken: string; refreshToken: string }>> {
        const deviceInfo: DeviceInfo = {
            ...getDeviceInfo(),
            deviceToken: this.deviceToken,
            ipAddress: "",
        };

        return fetcher('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password, deviceInfo }),
        });
    }

    public static async registerEmail(email: string): Promise<SuccessResponse<{ message: string }>> {

        return fetcher('/auth/register/email', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    }

    public static async verification(email: string, otp: string): Promise<SuccessResponse<{ message: string }>> {
        return fetcher('/auth/verification', {
            method: 'POST',
            body: JSON.stringify({ email, otp }),
        });
    }

    public static async registerBiodata(data: any): Promise<SuccessResponse<{ message: string }>> {
        return fetcher('/auth/register/biodata', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

}

export default AuthService;