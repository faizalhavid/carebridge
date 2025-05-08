import { DeviceInfo } from "@/interfaces/models/device-info";
import { fetcher } from "../utils/fetcher";
import { getDeviceInfo } from "../utils/get-device-info";

class AuthService {
    private static deviceToken = "1234567890";

    public static async login(email: string, password: string) {
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
}

export default AuthService;