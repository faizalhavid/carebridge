import { User } from "../../user";

export interface MenusResponse {
    accessToken: string;
    refreshToken: string;
    expiredAt: Date;
    user: User;
}

export interface MenuRolesResponse {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}