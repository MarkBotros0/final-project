import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, FormControl, Typography, createTheme, ThemeProvider, Modal, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { themes } from '../../config/themes';
import { closeModal } from '../../redux/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { ChangeEvent, FormEvent, useState } from 'react';
import { addCard } from '../../redux/cards/cardsSlice';
import {useEffect} from 'react'

export default function AddTaskModal({screenWidth}:{screenWidth:number}) {
    
    const [formData, setFormData] = useState({ title: "", desc: "", status: " " })

    const themeMode = useAppSelector((state) => state.theme.themeMode)
    const modalState = useAppSelector((state) => state.modal)
    const lists = useAppSelector(state => state.lists.lists)

    const dispatch = useAppDispatch()

    useEffect(() => {
     setFormData({ title: "", desc: "", status: " " })
    }, [modalState])
    

    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            '&:hover fieldset': {
                                borderColor: themes[themeMode].appbarText
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: themes[themeMode].bg.buttonPrimary
                            },
                            '& input': {
                                color: themes[themeMode].appbarText,
                                borderColor: themes[themeMode].drawerText
                            },
                        },
                    },
                },
            },
        }
    });

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: screenWidth > 768 ? 600 : "70%",
        boxShadow: 10,
        borderRadius: "10px",
        p:  screenWidth > 768 ? 4 : 2,
        bgcolor: themes[themeMode].drawerBg
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(addCard(formData.status, formData.title, formData.desc))
        setFormData({ title: "", desc: "", status: "" })
        dispatch(closeModal())
    };


    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <div>
            <Modal open={modalState.opened && modalState.type === "addTask"} onClose={() => dispatch(closeModal())}>
                <Box sx={style}>

                    <Typography sx={{ fontSize: '22px', mb: "20px", fontWeight: "bold", color: themes[themeMode].appbarText }}>
                        Add New Task
                    </Typography>

                    <form onSubmit={onSubmit}>

                        <ThemeProvider theme={theme}>
                            <FormControl fullWidth>
                                <Typography variant="h6" sx={{ color: themes[themeMode].modal.headers, fontSize: "15px", fontWeight: "bold" }}>
                                    Title
                                </Typography>
                                <TextField
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="e.g. Take cofee Break"
                                    sx={{ width: '100%', mt: '5px' }}

                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ mt: '20px' }}>
                                <Typography variant="h6" sx={{ color: themes[themeMode].modal.headers, fontSize: "15px", fontWeight: "bold" }}>
                                    Description
                                </Typography>
                                <TextField
                                    name="desc"
                                    value={formData.desc}
                                    onChange={handleInputChange}
                                    required
                                    multiline
                                    placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                                    sx={{ width: '100%', mt: '5px' }}
                                    inputProps={{ sx: { height: "300px" }, style: { color: themes[themeMode].appbarText, } }}

                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ mt: "20px" }}>
                                <Typography sx={{ color: themes[themeMode].modal.headers, fontSize: "15px", fontWeight: "bold" }}>
                                    Status
                                </Typography>
                                <Select
                                    name='status'
                                    value={formData.status}
                                    onChange={handleSelectChange}
                                    required
                                    inputProps={{ sx: { color: formData.status === ' ' ? themes[themeMode].drawerText : themes[themeMode].appbarText } }}
                                >
                                    <MenuItem disabled selected value={' '}>Select Status</MenuItem>
                                    {lists.map((list, i) => <MenuItem key={i} value={list.id} >{list.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <Box sx={{ display: 'flex', mt: "20px" }}>
                                <Button
                                    size="large"
                                    type="submit"
                                    sx={{
                                        '&:hover': { backgroundColor: themes[themeMode].bg.buttonPrimaryHover },
                                        fontSize: '17px',
                                        color: 'white',
                                        borderRadius: "40px",
                                        width: "100%",
                                        bgcolor: themes[themeMode].bg.buttonPrimary,
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    Create Task
                                </Button>
                            </Box>
                        </ThemeProvider>
                    </form>
                </Box>
            </Modal>
        </div >
    );
}
