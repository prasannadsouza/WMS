/*
import AdminUsers from './components/adminuser-container';
import SetPageTitle from '@/components/customui/pagetitle';
*/

import React from 'react'
import AdminUsers from './components/adminuser-container';
import SetPageTitle from '@/components/customui/pagetitle';

export default function AdminHome() {
    return (
        <div className='pb-2'>
            <SetPageTitle title="Admins" />
            <AdminUsers tableId={"adminusersmainpage"} showActions={true} enableRowSelection={true} enableMultiRowSelection={true} />
        </div>

    );
}
