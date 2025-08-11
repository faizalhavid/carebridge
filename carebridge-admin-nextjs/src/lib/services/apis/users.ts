import { RepositoryRestResource, SuccessResponse } from '@/types/api';
import { User } from '@/types/models/user';
import { get, post, put, del, patch } from '../axios';
import { UserRequest } from '@/types/schemas/user-schema';

export function getUsers(): Promise<RepositoryRestResource<User>> {
  return get('/admin/users', {}, true);
}

export function createUser(req: UserRequest): Promise<SuccessResponse<User>> {
  return post('/admin/users', req, {}, true);
}

export function updateUser(id: string | number, req: Partial<UserRequest>): Promise<SuccessResponse<User>> {
  return patch(`/admin/users/${id}`, req, {}, true);
}

export function deleteUser(id: string | number): Promise<SuccessResponse<void>> {
  return del(`/admin/users/${id}`, {}, true);
}

export function getUserById(id: string | number): Promise<SuccessResponse<User>> {
  return get(`/admin/users/${id}`, {}, true);
}
