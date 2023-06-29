'use client'
import { AdminUserTable } from "@/components/tables/admin-user-table";
//import { AppDataSlice } from "@/lib/store/appDataSlice"
import { appDataSlice } from "@/lib/store/appDataSlice"
import { useDispatch } from "react-redux";
import React, { useEffect } from 'react';

export default function AdminHome() {
    const { setCurrentTitle } = appDataSlice.actions
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setCurrentTitle("Admins"))
    }, []);

    return (
        <>
            <AdminUserTable />
        </>
    );
}
