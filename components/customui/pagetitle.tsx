/*
  import { AppState, appStore, selectAppData } from "@/lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"
  */

'use client'
import { AppState, appStore, selectAppData } from "@/lib/store/store"
import { appDataSlice } from "@/lib/store/appDataSlice"
import { useSelector } from 'react-redux';
import React from 'react'
export default function SetPageTitle({ title }: { title: string }) {
    const { setCurrentTitle } = appDataSlice.actions
    let currentTitle = selectAppData(appStore.getState()).currentTitle;

    React.useEffect(() => {
        if (currentTitle !== title) {
            appStore.dispatch(setCurrentTitle(title))
        }
    }, [])

    return (<></>)
}

export function PageTitle() {

    const currentTitle = useSelector((state: AppState) => selectAppData(state).currentTitle);

    return (
        <p className="text-center" >{currentTitle}</p>
    )
}
