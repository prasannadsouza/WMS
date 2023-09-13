export interface ConfirmDialog {
    title?: string;
    message?: string;
    confirmTitle?: string;
    cancelTitle?: string;
}

export interface MessageDialog {
    isError?: boolean;
    title?: string;
    message?: string;
    okTitle?: string;
}
