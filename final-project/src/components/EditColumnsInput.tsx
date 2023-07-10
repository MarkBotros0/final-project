import React, { useState } from 'react';
import { TextField, Button, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector } from '../hooks/reduxHooks';
import { themes } from '../config/themes';

interface list {
    name: string,
    id: string
}

interface EditColumnsInputProps {
    listNames: list[];
    getColumns: (columns: string[]) => void
}

const EditColumnsInput: React.FC<EditColumnsInputProps> = () => {

    const themeMode = useAppSelector((state) => state.theme.themeMode)
    const lists = useAppSelector(state => state.lists.lists)

    const [inputs, setInputs] = useState(lists);

    const handleInputChange = (index: number, value: string) => {
        const updatedInputs = [...inputs];
        updatedInputs[index].name = value;
        setInputs(updatedInputs);
    };

    const handleAddInput = () => {
        setInputs([...inputs, { name: '', id: "" }]);
    };

    const handleDeleteInput = (index: number) => {
        const updatedInputs = [...inputs];
        updatedInputs.splice(index, 1);
        setInputs(updatedInputs);
    };

    return (
        <div>
            {inputs.map((input, index) => (
                <Stack direction={'row'} key={index} sx={{ display: 'flex', alignItems: 'center', mb: "20px" }}>
                    <TextField
                        required
                        fullWidth
                        value={input}
                        placeholder='e.g. Todo'
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                    <IconButton onClick={() => handleDeleteInput(index)}>
                        <CloseIcon sx={{ color: themes[themeMode].modal.headers }} />
                    </IconButton>
                </Stack>
            ))}

            <Button
                size="large"
                onClick={handleAddInput}
                sx={{
                    '&:hover': { backgroundColor: themes[themeMode].button.secondaryHover },
                    fontSize: '17px',
                    color: themes[themeMode].bg.buttonPrimary,
                    borderRadius: "40px",
                    width: "100%",
                    bgcolor: themes[themeMode].button.secondary,
                    textTransform: 'capitalize',
                    fontWeight: "bold"
                }}
            >
                + Add New Column
            </Button>
        </div>
    );
};

export default EditColumnsInput

