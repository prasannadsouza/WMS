'use client'
import React from 'react';

/*
import { MessageDialog } from '@/lib/types/models'
 */

import { MessageDialog } from '@/lib/types/models'

export default function useMessage() {

    const [show, setShow] = React.useState(false);
    const [model, setModel] = React.useState<MessageDialog | null>(null)
    const [callback, setCallback] = React.useState<typeOnClose | null>(null);

    const showMessage = ({ model, onClose }: { model: MessageDialog, onClose: typeOnClose }) => {
        setModel(model);
        setShow(true);
        if (onClose) setCallback(() => onClose);
    }

    const closeMessage = () => {

        if (callback) {
            callback()
            setCallback(null)
        }
        setShow(false);
        setModel(null);
    }

    return { show, showMessage, closeMessage, model }
}

export type typeUseMessage = ReturnType<typeof useMessage>
export type typeOnClose = () => void
