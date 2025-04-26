export interface RegisterRequest {
    token: string;
    email: string;
    fullname: string;
    mobilePhone: string | number;
    password: string;
    confirmPassword: string;
    imagePath: string | undefined;
}