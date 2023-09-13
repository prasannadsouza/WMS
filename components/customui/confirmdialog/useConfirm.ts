'use client'
import React from 'react';

/*
import { ConfirmDialog } from '@/lib/types/models'
 */

import { ConfirmDialog } from '@/lib/types/models'

export default function useConfirm() {

    const [show, setShow] = React.useState(false);
    const [model, setModel] = React.useState<ConfirmDialog | null>(null)
    const [callback, setCallback] = React.useState<typeOnClose | null>(null);

    const showConfirm = ({ model, onClose }: { model: ConfirmDialog, onClose: typeOnClose }) => {
        setModel(model);
        setShow(true);
        if (onClose) setCallback(() => onClose);
    }

    const closeConfirm = (confirmed: boolean) => {

        if (callback) {
            callback(confirmed)
            setCallback(null)
        }
        setShow(false);
        setModel(null);
    }

    return { show, showConfirm, closeConfirm, model }
}

export type typeUseConfirm = ReturnType<typeof useConfirm>
export type typeOnClose = (confirmed: boolean) => void
