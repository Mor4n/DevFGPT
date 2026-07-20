import type { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import InputChat from "./InputChat";

interface Props {
    register: UseFormRegister<FormData>;
    handleSubmit: UseFormHandleSubmit<FormData>;
    onSubmit: (data: FormData) => void;
    userMsg: string;
    setUserMsg: React.Dispatch<React.SetStateAction<string>>;
}

function Form({register, handleSubmit, onSubmit, userMsg, setUserMsg}:Props  ){
    

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputChat 
            register={register}
            userMsg={userMsg}
            setUserMsg={setUserMsg}
            />
        </form>
    );
}

export default Form;
