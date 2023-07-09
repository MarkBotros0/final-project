import Button from '@mui/material/Button';
import { Stack, Typography, Modal, Box } from '@mui/material';
import { themes } from '../../config/themes';
import { closeModal } from '../../redux/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { deleteBoard, setFirstBoard } from '../../redux/boards/boardsSlice';

export default function DeleteBoardModal({screenWidth}:{screenWidth:number}) {

    const themeMode = useAppSelector((state) => state.theme.themeMode)
    const modalState = useAppSelector((state) => state.modal)
    const board = useAppSelector(state => state.boards.selectedBoard)

    const dispatch = useAppDispatch()

    const handleDelete = () => {
        dispatch(deleteBoard(board.id))
        dispatch(setFirstBoard())
        dispatch(closeModal())
    }

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

    return (
        <div>
            <Modal open={modalState.opened && modalState.type === "deleteBoard"} onClose={() => dispatch(closeModal())}>
                <Box sx={style}>
                    <Box>

                        <Typography sx={{ fontSize: '22px', mb: "20px", fontWeight: "bold", color: themes[themeMode].bg.buttonDestructive }}>
                            Delete this board?
                        </Typography>

                        <Typography sx={{ color: themes[themeMode].drawerText }}>Are you sure you want to delete the '{board.name}' board? This action will remove all columns and tasks and cannot be reversed.</Typography>

                        <Stack direction={'row'} spacing={4} sx={{ mt: "30px" }}>
                            <Button
                                size="large"
                                onClick={handleDelete}
                                sx={{
                                    '&:hover': { backgroundColor: themes[themeMode].bg.buttonDestructiveHover },
                                    fontSize: '17px',
                                    color: 'white',
                                    borderRadius: "40px",
                                    width: "100%",
                                    bgcolor: themes[themeMode].bg.buttonDestructive,
                                    textTransform: 'capitalize',
                                }}
                            >
                                Delete
                            </Button>
                            <Button
                                size="large"
                                onClick={() => dispatch(closeModal())}
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
                                Cancel
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Modal>
        </div >
    );
}
