import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { themes } from '../../config/themes';
import Logo from './images/Group 15.svg'
import { openModal } from '../../redux/modal/modalSlice';
import MoreButtonDashBoard from '../MoreButtonBoard';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material'
import DropDownModal from './DropDownModal';
import { useEffect } from 'react'
import { fetchLists } from '../../redux/lists/listsSlice';
import { resetCards } from '../../redux/cards/cardsSlice';

export default function MobileAppBar() {

    const dispatch = useAppDispatch()
    const selectedBoard = useAppSelector((state) => state.boards.selectedBoard)
    const themeMode = useAppSelector((state) => state.theme.themeMode)

    useEffect(() => {
        dispatch(fetchLists(selectedBoard.id))
        dispatch(resetCards())
    }, [selectedBoard])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ bgcolor: themes[themeMode].drawerBg }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", py: "20px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ borderColor: themes[themeMode].drawerText, height: "37    px" }}>
                                <img style={{ width: "100%", height: "100%" }} alt='#' src={Logo} />
                            </Box>

                            <Typography sx={{ fontWeight: "bold", fontSize: "20px", color: themes[themeMode].appbarText, ml: "10px" }} noWrap>
                                {selectedBoard.name}
                            </Typography>
                            <DropDownModal />
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box>
                                <IconButton onClick={() => dispatch(openModal({ type: 'addTask' }))}
                                    sx={{
                                        bgcolor: themes[themeMode].bg.buttonPrimary, borderRadius: "30px", textTransform: "none", fontWeight: "bold",
                                        padding: "5px 15px",
                                        '&:hover': {
                                            backgroundColor: themes[themeMode].bg.buttonPrimaryHover,
                                        }
                                    }}>
                                    <AddIcon sx={{ color: "white", fontSize: "30px" }} />
                                </IconButton>
                            </Box>
                            <MoreButtonDashBoard />
                        </Box>

                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}