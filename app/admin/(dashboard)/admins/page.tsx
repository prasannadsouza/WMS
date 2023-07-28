/*
import { AdminUserTable } from "@/components/tables/admin-user-table";
import { appStore } from "@/lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"
import { AdminUserTable } from '@/components/tables/admin-user-table';
*/

import React from 'react'
import { appStore } from "@/lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"
import AdminUsers from './components/adminuser-container';

export default function AdminHome() {
    const { setCurrentTitle } = appDataSlice.actions
    appStore.dispatch(setCurrentTitle("Admins"))

    return (
        <div className='pb-2'>
            <AdminUsers />
        </div>

    );
}
