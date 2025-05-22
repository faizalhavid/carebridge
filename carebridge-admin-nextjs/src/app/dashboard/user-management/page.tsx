"use client";
import React, { useEffect } from "react";
import { User } from "@/interfaces/models/user";
import { fetcher } from "@/lib/utils/fetcher";
import { RepositoryRestResource } from "@/interfaces/server-res";
import { createApiStore } from "@/lib/stores/api_store";
import ResourceView from "@/components/resource";


const useUserStore = createApiStore<RepositoryRestResource<User[]>>(
    () => fetcher('/admin/users', { method: 'GET' }, true)
);

const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
) => {
    // Handle page change logic here
    console.log("Page changed to:", value);
}

export default function UserManagementPage() {
    const { data, loading, error, fetchData } = useUserStore();
    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading users.</div>;
    }

    return (


        <ResourceView<User>
            title="User Management"
            resource={data}
            columns={[
                { key: "id", label: "ID" },
                { key: "name", label: "Nama" },
                { key: "email", label: "Email" },
            ]}
            onSearch={(v) => console.log(v)}
            onFilterClick={() => console.log("filter")}
            onAddClick={() => console.log("add")}
            onPageChange={handlePageChange}
            renderActions={(user) => (
                <>
                    <button>Edit</button>
                    <button>Delete</button>
                </>
            )}
        />

    );
}