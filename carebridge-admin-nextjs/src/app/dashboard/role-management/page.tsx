"use client";
import React, { useEffect } from "react";
import { fetcher } from "@/lib/utils/fetcher";
import { RepositoryRestResource } from "@/interfaces/server-res";
import { createApiStore } from "@/lib/stores/api_store";
import ResourceView from "@/components/resource";
import { Role } from "@/interfaces/models/user";


const useUserStore = createApiStore<RepositoryRestResource<Role[]>>(
    () => fetcher('/admin/roles', { method: 'GET' }, true)
);

const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
) => {
    // Handle page change logic here
    console.log("Page changed to:", value);
}

export default function RoleManagementPage() {
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


        <ResourceView<Role>
            title="Role Management"
            resource={data}
            columns={[
                { key: "id", label: "ID" },
                { key: "name", label: "Nama" },
            ]}
            onSearch={(v) => console.log(v)}
            onFilterClick={() => console.log("filter")}
            onAddClick={() => console.log("add")}
            onPageChange={handlePageChange}
            renderActions={(role) => (
                <>
                    <button>Edit</button>
                    <button>Delete</button>
                </>
            )}
        />

    );
}