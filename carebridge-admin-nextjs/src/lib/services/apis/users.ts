import { RepositoryRestResource, SuccessResponse } from "@/types/api";
import { User } from "@/types/models/user";
import { get, post, put, del } from "../axios";
import { UserRequest } from "@/types/schemas/user-schema";


export function getUsers(): Promise<RepositoryRestResource<User[]>> {
    return get('/admin/users', {}, true);
}

export function createUser(req: UserRequest): Promise<SuccessResponse<User>> {
    return post('/admin/manage-user', req, {}, true);
}

export function updateUser(id: string | number, req: UserRequest): Promise<SuccessResponse<User>> {
    return put(`/admin/manage-user/${id}`, req, {}, true);
}

export function deleteUser(id: string | number): Promise<SuccessResponse<void>> {
    return del(`/admin/manage-user/${id}`, {}, true);
}

export function getUserById(id: string | number): Promise<SuccessResponse<User>> {
    return get(`/admin/users/${id}`, {}, true);
}
