import * as React from 'react';
import Modal from '@mui/material/Modal';
import { IconButton, Box, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Switch from '../Switch'
import { themes } from '../../config/themes';
import { TbLayoutBoardSplit } from 'react-icons/tb';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { openModal } from '../../redux/modal/modalSlice';
import { board, selectBoard } from '../../redux/boards/boardsSlice';



export default function DropDownModal() {
    const [open, setOpen] = React.useState(false);
    const toggleOpen = () => setOpen(!open);
    const themeMode = useAppSelector((state) => state.theme.themeMode)
    const boards = useAppSelector((state) => state.boards.boards)
    const selectedBoard = useAppSelector((state) => state.boards.selectedBoard)
    const dispatch = useAppDispatch()

    const handleSelect = (item: board) => {
        dispatch(selectBoard(item))
        toggleOpen()
    }
    const style = {
        position: 'absolute' as 'absolute',
        top: '36%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "70%",
        bgcolor: themes[themeMode].drawerBg,
        boxShadow: 24,
        borderRadius: "10px"
    };

    return (
        <div>
            <IconButton onClick={toggleOpen} >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <Modal
                open={open}
                onClose={toggleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ pr: "20px", display: "flex", height: "100%", justifyContent: "space-between", flexDirection: "column" }}>

                        <Box>
                            <Typography sx={{ fontSize: "12px", textTransform: "uppercase", color: themes[themeMode].drawerText, ml: "30px", lineHeight: "15px", fontWeight: "bold", py: "20px" }}>
                                All Boards ({boards.length})
                            </Typography>

                            {boards?.map((item: board) => {
                                const isSelected = selectedBoard.id === item.id ? true : false;
                                return (
                                    <Box
                                        key={item.id}
                                        onClick={() => handleSelect(item)}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            py: "10px",
                                            pl: "30px",
                                            color: isSelected ? "white" : themes[themeMode].drawerText,
                                            bgcolor: isSelected
                                                ? themes[themeMode].bg.buttonPrimary
                                                : themes[themeMode].drawerBg,
                                            borderTopRightRadius: "25px",
                                            borderBottomRightRadius: "25px",
                                            cursor: "pointer",
                                            "&:hover": {
                                                bgcolor: isSelected ? themes[themeMode].bg.buttonPrimary : themes[themeMode].mainBg
                                            }
                                        }}
                                    >
                                        <TbLayoutBoardSplit style={{ fontSize: "20px", fontWeight: "normal" }} />
                                        <Typography sx={{ fontSize: "15px", fontWeight: "bold", ml: "10px" }}>
                                            {item.name}
                                        </Typography>
                                    </Box>
                                );
                            })}

                            <Box
                                onClick={() => dispatch(openModal({ type: "addBoard" }))}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    py: "10px",
                                    pl: "30px",
                                    color: themes[themeMode].bg.buttonPrimary,
                                    cursor: "pointer",
                                    "&:hover": {
                                        bgcolor: themes[themeMode].taskHover,
                                        borderTopRightRadius: "25px",
                                        borderBottomRightRadius: "25px"
                                    }
                                }}
                            >
                                <TbLayoutBoardSplit style={{ fontSize: "20px", fontWeight: "normal" }} />
                                <Typography sx={{ fontSize: "15px", fontWeight: "bold", ml: "10px" }}>
                                    + Create New Board
                                </Typography>
                            </Box>
                        </Box>

                    </Box>

                    <Box sx={{ mb: "30px" }}>
                        <Box sx={{ px: "20px", mb: '20px' }}>
                            <Switch />
                        </Box>
                    </Box>








                </Box>
            </Modal>
        </div >
    );
}