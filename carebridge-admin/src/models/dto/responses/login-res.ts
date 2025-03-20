import { User } from "../../user";

export interface LoginResponse {
    token: {
        accessToken: string;
        refreshToken: string;
    };
    expiredAt: Date;
    user: User;
}