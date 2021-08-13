import { toast } from "react-toastify";

export const errorToast = (message: string) => {
    toast.error(message)
};

export const successToast = (message: string) => {
    toast.success(message);
}

export const infoToast = (message: string) => {
    toast.info(message);
}