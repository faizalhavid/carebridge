import { RepositoryRestResource, SuccessResponse } from "@/types/api";
import { Role } from "@/types/models/user";
import { del, get, post, put } from "../axios";
import { RoleRequest } from "@/types/schemas/role-schema";



export function getRoles(): Promise<RepositoryRestResource<Role[]>> {
    return get('/admin/roles', {}, true);
}

export function getRoleById(id: string | number): Promise<Role> {
    return get(`/admin/roles/${id}`, {}, true);
}

export function createRole(req: RoleRequest): Promise<Role> {
    return post('/admin/roles', req, {}, true);
}

export function updateRole(id: string | number, req: RoleRequest): Promise<Role> {
    return put(`/admin/roles/${id}`, req, {}, true);
}

export function deleteRole(id: string | number): Promise<void> {
    return del(`/admin/roles/${id}`, {}, true);
}

