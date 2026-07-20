import type {FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

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