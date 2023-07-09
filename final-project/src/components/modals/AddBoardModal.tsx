import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, FormControl, Typography, createTheme, ThemeProvider, Modal } from '@mui/material';
import { themes } from '../../config/themes';
import { closeModal } from '../../redux/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import ColumnsInput from '../ColumnsInput';
import { FormEvent, useState, ChangeEvent } from 'react';
import { createBoard } from '../../redux/boards/boardsSlice';


export default function AddBoardModal({ screenWidth }: { screenWidth: number }) {

    const dispatch = useAppDispatch()

    const themeMode = useAppSelector((state) => state.theme.themeMode)
    const modalState = useAppSelector((state) => state.modal)

    const [formData, setFormData] = useState({ name: '' })
    const [columnInputs, setColumnInputs] = useState([""])


    const getColumns = (columns: string[]) => {
        setColumnInputs(columns)
    }

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

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createBoard(formData.name, columnInputs))
        setFormData({ name: '' })
        dispatch(closeModal())
    };

    return (
        <div>
            <Modal open={modalState.opened && modalState.type === "addBoard"} onClose={() => dispatch(closeModal())}>

                <Box sx={style}>
                    <Typography sx={{ fontSize: '22px', mb: "20px", fontWeight: "bold", bgcolor: themes[themeMode].drawerBg, color: themes[themeMode].appbarText }}>
                        Add New Board
                    </Typography>

                    <ThemeProvider theme={theme}>
                        <Box sx={{}}>
                            <form onSubmit={onSubmit}>
                                <FormControl fullWidth sx={{ mb: "20px" }}>
                                    <Typography sx={{ color: themes[themeMode].modal.headers, fontSize: "15px", fontWeight: "bold" }}>
                                        Name
                                    </Typography>
                                    <TextField
                                        name="name"
                                        onChange={handleInputChange}
                                        value={formData.name}
                                        required
                                        placeholder="e.g. Web Design"
                                        sx={{ width: '100%', mt: '5px' }}
                                    />
                                </FormControl>

                                <Typography sx={{ color: themes[themeMode].modal.headers, fontSize: "15px", fontWeight: "bold" }}>
                                    Columns
                                </Typography>

                                <ColumnsInput listNames={['']} getColumns={getColumns} />

                                <Box sx={{ display: 'flex', mt: "30px" }}>
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
                                        Create New Board
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </ThemeProvider>
                </Box>
            </Modal>
        </div >
    );
}
