'use client'
import React from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import TasksList from "@/app/components/Tasks/TasksList"

function Admin() {
    const { user } = useAuthContext();
    const router = useRouter();

    React.useEffect(() => {
        if (user == null) {
            router.push("/");
        }
    }, [user, router]);

    return (
        <>
         <h1>Only logged in users can view this page</h1>
         <TasksList/>
        </>
    );
}

export default Admin;
