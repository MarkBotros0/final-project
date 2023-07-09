import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, FormControl, Typography, createTheme, SelectChangeEvent, Select, ThemeProvider, Modal, MenuItem } from '@mui/material';
import { themes } from '../../config/themes';
import { closeModal } from '../../redux/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect, useState, ChangeEvent } from 'react';
import { editCard } from '../../redux/cards/cardsSlice';

export default function EditTaskModal({screenWidth}:{screenWidth:number}) {

    const dispatch = useAppDispatch()

    const themeMode = useAppSelector((state) => state.theme.themeMode)
    const modalState = useAppSelector((state) => state.modal)
    const selectedCard = useAppSelector(state => state.cards.selectedCard)
    const lists = useAppSelector((state) => state.lists.lists)
    const selectedListId = useAppSelector((state) => state.lists.selectedListId)
    const currBoard = useAppSelector((state) => state.boards.selectedBoard.id)

    const [cardData, setCardData] = useState(selectedCard)
    const [selectedListOption, setSelectedListOption] = useState(selectedListId)

    useEffect(() => {
        setSelectedListOption(selectedListId)
    }, [modalState])
    useEffect(() => {
        setCardData(selectedCard)
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

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCardData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setSelectedListOption(event.target.value);
    };

    const onSubmit = () => {
        dispatch(editCard(selectedCard.id, cardData.name, cardData.desc, selectedListId, selectedListOption, currBoard))
        dispatch(closeModal())
    };

    return (
        <div>
            <Modal open={modalState.opened && modalState.type === "editTask"} onClose={() => dispatch(closeModal())}>
                <Box sx={style}>

                    <Typography sx={{ fontSize: '22px', mb: '20px', fontWeight: "bold", color: themes[themeMode].appbarText }}>
                        Edit Task
                    </Typography>

                    <ThemeProvider theme={theme}>
                        <Box>
                            <form onSubmit={onSubmit}>
                                <FormControl fullWidth>
                                    <Typography variant="h6" sx={{ color: themes[themeMode].modal.headers, fontSize: "15px", fontWeight: "bold" }}>
                                        Title
                                    </Typography>
                                    <TextField
                                        name="name"
                                        value={cardData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Take cofee Break"
                                        required
                                        sx={{ width: '100%', mt: '5px' }}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ my: '20px' }}>
                                    <Typography variant="h6" sx={{ color: themes[themeMode].modal.headers, fontSize: "15px", fontWeight: "bold" }}>
                                        Description
                                    </Typography>
                                    <TextField
                                        name="desc"
                                        value={cardData.desc}
                                        onChange={handleInputChange}
                                        multiline
                                        required
                                        placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
                                        sx={{ width: '100%', mt: '5px' }}
                                        inputProps={{ sx: { height: "300px" }, style: { color: themes[themeMode].appbarText, } }}

                                    />

                                </FormControl>

                                <FormControl fullWidth>
                                    <Typography variant="h6" sx={{ color: themes[themeMode].modal.headers, fontSize: "15px", fontWeight: "bold" }}>
                                        Status
                                    </Typography>

                                    <Select
                                        name='status'
                                        value={selectedListOption}
                                        onChange={handleSelectChange}
                                        required
                                        inputProps={{ sx: { color: themes[themeMode].appbarText } }}
                                    >
                                        {lists.map((list, i) => (
                                            <MenuItem key={i} value={list.id} >{list.name}</MenuItem>
                                        ))
                                        }
                                    </Select>
                                </FormControl>

                                <Box sx={{ display: 'flex', mt: "30px" }}>
                                    <Button
                                        size="large"
                                        type='submit'
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
                                        Save Changes
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
