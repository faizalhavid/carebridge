import { RepositoryRestResource } from "@/types/api";
import { User } from "@/types/models/user";
import { get, post, put, del } from "../axios";

export interface CreateUserRequest {
    email: string;
    fullName: string;
    address: string;
    password: string;
}

export interface UpdateUserRequest {
    id: string | number;
    email?: string;
    fullName?: string;
    address?: string;
    password?: string;
}

// Get all users
export function getUsers(): Promise<RepositoryRestResource<User[]>> {
    return get('/admin/users');
}

// Create a new user
export function createUser(userData: CreateUserRequest): Promise<User> {
    return post('/admin/manage-user', userData);
}

// Update an existing user
export function updateUser(userData: UpdateUserRequest): Promise<User> {
    return put(`/admin/manage-user/${userData.id}`, userData);
}

// Delete a user
export function deleteUser(userId: string | number): Promise<void> {
    return del(`/admin/manage-user/${userId}`);
}

// Get user by ID
export function getUserById(userId: string | number): Promise<User> {
    return get(`/admin/users/${userId}`);
}
