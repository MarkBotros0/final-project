import { useState, ChangeEvent, FormEvent } from 'react';
import { SelectChangeEvent } from '@mui/material'

export interface Values {
    [key: string]: string;
}

export interface Errors {
    [key: string]: string;
}

interface FormDef {
    initialValues: Values;
    onSubmit: (values: Values) => void;
    validate: (values: Values) => Errors;
}

const useForm = ({ initialValues, onSubmit, validate }: FormDef) => {
    const [values, setValues] = useState<Values>(initialValues);
    const [errors, setErrors] = useState<Errors>({});

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            onSubmit(values);
        } else {
            alert(JSON.stringify(validationErrors));
        }
    };

    return { values, setValues, handleChange, handleSubmit, errors };
};

export default useForm;
