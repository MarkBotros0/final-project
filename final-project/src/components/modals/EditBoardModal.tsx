import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, FormControl, Typography, createTheme, ThemeProvider, Modal, Stack, IconButton } from '@mui/material';
import { themes } from '../../config/themes';
import { closeModal } from '../../redux/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { FormEvent, useState, useEffect } from 'react';
import { editLists, fetchLists } from '../../redux/lists/listsSlice';
import CloseIcon from '@mui/icons-material/Close';
import { fetchBoards } from '../../redux/boards/boardsSlice';

export default function EditBoardModal({ screenWidth }: { screenWidth: number }) {

    const themeMode = useAppSelector((state) => state.theme.themeMode)
    const modalState = useAppSelector((state) => state.modal)
    const board = useAppSelector(state => state.boards.selectedBoard)

    const lists = useAppSelector(state => state.lists.lists)


    const [boardName, setBoardName] = useState(board.name)
    const [inputs, setInputs] = useState(lists);
    const dispatch = useAppDispatch()

    useEffect(() => {
        setBoardName(board.name)
        setInputs(lists)
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
        p: screenWidth > 768 ? 4 : 2,
        bgcolor: themes[themeMode].drawerBg
    };

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(closeModal())
        console.log(inputs)
        dispatch(editLists(lists, inputs, board, boardName))
            .then(() => {
                dispatch(fetchBoards())
                dispatch(fetchLists(board.id))
            })
    };

    const handleInputChange = (index: number, value: string) => {
        const updatedInputs = [...inputs];
        const newObj = { id: updatedInputs[index].id, name: value }
        updatedInputs[index] = newObj;
        setInputs(updatedInputs);
    };

    const handleAddInput = () => {
        setInputs([...inputs, { name: "", id: "newList" }]);
    };

    const handleDeleteInput = (index: number) => {
        const updatedInputs = [...inputs];
        updatedInputs.splice(index, 1);
        setInputs(updatedInputs);
    };

    return (
        <div>
            <Modal open={modalState.opened && modalState.type === "editBoard"} onClose={() => dispatch(closeModal())}>
                <Box sx={style}>

                    <Typography sx={{ fontSize: '22px', mb: '20px', fontWeight: "bold", color: themes[themeMode].appbarText }}>
                        Edit Board
                    </Typography>

                    <ThemeProvider theme={theme}>
                        <Box>
                            <form onSubmit={onSubmit}>
                                <FormControl fullWidth>
                                    <Typography variant="h6" sx={{ color: themes[themeMode].modal.headers, fontSize: "15px", fontWeight: "bold" }}>
                                        Board Name
                                    </Typography>
                                    <TextField
                                        name="boardName"
                                        onChange={(e) => setBoardName(e.target.value)}
                                        value={boardName}
                                        required
                                        placeholder="e.g. Take cofee Break"
                                        sx={{ width: '100%', mt: '5px' }}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ mt: '20px' }}>

                                    <Typography variant="h6" sx={{ color: themes[themeMode].modal.headers, fontSize: "15px", fontWeight: "bold" }}>
                                        Boards Columns
                                    </Typography>

                                    {inputs.map((input, index) => (
                                        <div key={index}>
                                            <Stack direction={'row'} key={index} sx={{ display: 'flex', alignItems: 'center', mb: "20px" }}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    value={input.name}
                                                    placeholder='e.g. Todo'
                                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                                />
                                                <IconButton onClick={() => handleDeleteInput(index)}>
                                                    <CloseIcon sx={{ color: themes[themeMode].modal.headers }} />
                                                </IconButton>
                                            </Stack>
                                        </div>
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