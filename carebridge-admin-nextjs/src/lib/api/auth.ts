import { fetcher } from "../utils/fetcher"




export async function loginService(email: string, password: string) {
    return fetcher('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}