import InputChat from "./InputChat";

import type {FormProps} from "../interfaces/FormInterfaces"


function Form({onSubmit,handleSubmit,register, errors}:FormProps  ){

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputChat register={register} errors={errors}/>
        </form>
    );
}

export default Form;
