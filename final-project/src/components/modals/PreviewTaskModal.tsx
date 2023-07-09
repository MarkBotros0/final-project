import { Box, FormControl, Typography, createTheme, ThemeProvider, Modal, Stack, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { themes } from '../../config/themes';
import { closeModal } from '../../redux/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import MoreButtonTask from '../MoreButtonTask';
import { useState, useEffect } from 'react';
import { selectList } from '../../redux/lists/listsSlice';
import { moveCard } from '../../redux/cards/cardsSlice';

export default function PreviewTaskModal({ screenWidth }: { screenWidth: number }) {

    const dispatch = useAppDispatch()

    const themeMode = useAppSelector((state) => state.theme.themeMode)
    const modalState = useAppSelector((state) => state.modal)
    const lists = useAppSelector((state) => state.lists.lists)
    const selectedListId = useAppSelector((state) => state.lists.selectedListId)
    const selectedCard = useAppSelector((state) => state.cards.selectedCard)
    const currBoard = useAppSelector((state) => state.boards.selectedBoard.id)

    const [selectedListOption, setSelectedListOption] = useState(selectedListId)

    useEffect(() => {
        setSelectedListOption(selectedListId)
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

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setSelectedListOption(event.target.value);
    };

    const handleCloseModal = () => {
        dispatch(closeModal())
        console.log("test")
        if (selectedCard.idList !== selectedListOption) {
            dispatch(moveCard(selectedCard.id, selectedListOption, currBoard))
            dispatch(selectList(selectedListOption))
        }
    }

    return (
        <div>
            <Modal open={modalState.opened && modalState.type === "previewTask"} onClose={handleCloseModal}>
                <Box sx={style}>

                    <Stack direction={'row'} sx={{
                        justifyContent: "space-between",
                        fontWeight: "bold", color: themes[themeMode].appbarText
                    }}>
                        <Typography sx={{ color: themes[themeMode].appbarText, fontWeight: "bold", fontSize: "20px", paddingRight: "50px" }}>{modalState.currentTask.name}</Typography>
                        <MoreButtonTask />
                    </Stack>

                    <ThemeProvider theme={theme}>
                        <Box>

                            <Typography sx={{ color: themes[themeMode].modal.headers, fontSize: "15px" }}>
                                {modalState.currentTask.desc}
                            </Typography>

                            <FormControl fullWidth sx={{ mt: '20px' }}>
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

                        </Box>
                    </ThemeProvider>
                </Box>

            </Modal>
        </div >
    );
}
