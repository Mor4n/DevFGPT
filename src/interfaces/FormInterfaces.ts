import type {FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import type { ReactNode } from "react";

export interface FormData {
  message: string;
};

export interface FormProps {
    onSubmit: (data:FormData) => void;
    handleSubmit: UseFormHandleSubmit<FormData>;
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
}

export interface InputChatProps {
    register: UseFormRegister<FormData>;
    errors: FieldErrors<FormData>;
}


export interface SidebarItemProps {
    icon?: ReactNode;
    children: ReactNode;
}