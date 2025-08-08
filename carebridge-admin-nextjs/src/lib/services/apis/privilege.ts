import { RepositoryRestResource } from "@/types/api";
import { Privilege } from "@/types/models/user";
import { del, get, post, put } from "../axios";
import { PrivilegeRequest } from "@/types/schemas/privilege-schema";



export function getPrivilege(): Promise<RepositoryRestResource<Privilege[]>> {
    return get('/admin/privileges', {}, true);
}

export function getPrivilegeById(id: string | number): Promise<Privilege> {
    return get(`/admin/privileges/${id}`, {}, true);
}

export function createPrivilege(req: PrivilegeRequest): Promise<Privilege> {
    return post('/admin/privileges', req, {}, true);
}

export function updatePrivilege(id: number | string, req: PrivilegeRequest): Promise<Privilege> {
    return put(`/admin/privileges/${id}`, req, {}, true);
}

export function deletePrivilege(id: number | string): Promise<void> {
    return del(`/admin/privileges/${id}`, {}, true);
}