import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchLists } from '../redux/lists/listsSlice';
import { resetCards } from '../redux/cards/cardsSlice';
import { themes } from '../config/themes';
import { openModal } from '../redux/modal/modalSlice';
import MoreButtonDashBoard from './MoreButtonBoard';
import { Button } from '@mui/material';
import Logo from '../images/Group 15.svg'
import Switch from './Switch'
import { board, selectBoard } from '../redux/boards/boardsSlice';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { TbLayoutBoardSplit } from 'react-icons/tb';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

type PersistentDrawerProps = {
    children: React.ReactNode;
}

export default function Layout({ children }: PersistentDrawerProps) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const themeMode = useAppSelector((state) => state.theme.themeMode)
    const boards = useAppSelector((state) => state.boards.boards)
    const selectedBoard = useAppSelector((state) => state.boards.selectedBoard)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchLists(selectedBoard.id))
        dispatch(resetCards())
    }, [selectedBoard])

    return (
        <Box sx={{ display: 'flex', }}>
            <CssBaseline />

            <AppBar position="fixed" open={open}
                sx={{
                    boxShadow: 'none',
                    bgcolor: themes[themeMode].drawerBg,
                    color: themes[themeMode].appbarText,
                    borderBottom: "solid 1px",
                    borderColor: themes[themeMode].appBarBorder
                }}
            >
                <Toolbar sx={{ boxShadow: "none", pb: "20px", pt: "10px", }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", mt: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box display={open ? 'none' : 'flex'} sx={{ borderColor: themes[themeMode].drawerText, width: drawerWidth }}>
                                <img alt='#' src={Logo} />
                                <Typography sx={{ pl: "15px", fontWeight: "bold", fontSize: "25px" }} variant="h6" noWrap component="div">
                                    Kanban
                                </Typography>
                            </Box>

                            <Typography sx={{ fontWeight: "bold", fontSize: "16px" }} noWrap>
                                {selectedBoard.name}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Button onClick={() => dispatch(openModal({ type: 'addTask' }))}
                                sx={{
                                    bgcolor: themes[themeMode].bg.buttonPrimary, borderRadius: "30px", textTransform: "none", fontWeight: "bold", fontSize: "15px", p: "12px 17px",
                                    '&:hover': {
                                        backgroundColor: themes[themeMode].bg.buttonPrimaryHover, // Set the desired hover background color
                                    }
                                }} variant='contained'>+ Add New Task</Button>
                            <MoreButtonDashBoard />
                        </Box>

                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    bgcolor: themes[themeMode].drawerBg
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{ padding: "20px", margin: "0", justifyContent: "start", bgcolor: themes[themeMode].drawerBg }}>
                    <Box sx={{ display: "flex", marginTop: "10px", borderColor: themes[themeMode].drawerText, alignItems: "center", justifyContent: "start" }}>
                        <img alt='#' src={Logo} />
                        <Typography sx={{ pl: "15px", fontWeight: "bold", fontSize: "25px", color: themes[themeMode].appbarText }} noWrap component="div">
                            Kanban
                        </Typography>
                    </Box>
                </DrawerHeader>

                <Box sx={{ pr: "20px", display: "flex", height: "100%", justifyContent: "space-between", flexDirection: "column", bgcolor: themes[themeMode].drawerBg }}>

                    <Box>
                        <Typography sx={{ fontSize: "12px", textTransform: "uppercase", color: themes[themeMode].drawerText, ml: "30px", lineHeight: "15px", fontWeight: "bold", py: "20px" }}>
                            All Boards ({boards.length})
                        </Typography>

                        {boards?.map((item: board) => {
                            const isSelected = selectedBoard.id === item.id ? true : false;
                            return (
                                <Box
                                    key={item.id}
                                    onClick={() => dispatch(selectBoard(item))}
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

                <Box sx={{ pb: "30px", bgcolor: themes[themeMode].drawerBg }}>
                    <Box sx={{ px: "20px", mb: '20px' }}>
                        <Switch />
                    </Box>
                    <Box sx={{
                        display: "flex", alignItems: "center", color: themes[themeMode].drawerText, cursor: "pointer", pl: "20px",
                        '&:hover': { bgcolor: themes[themeMode].mainBg }
                    }} onClick={toggleDrawer}>
                        <IconButton >
                            <FaRegEyeSlash style={{ color: themes[themeMode].drawerText, fontSize: "15px" }} />
                        </IconButton>
                        <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>Hide Sidebar</Typography>
                    </Box>
                </Box>

            </Drawer>

            <Main sx={{ bgcolor: themes[themeMode].mainBg, height: "100vh" }} open={open}>
                <DrawerHeader />
                {!open &&
                    <IconButton
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        edge="start"
                        sx={{
                            position: "fixed",
                            bottom: "30px",
                            left: "0px",
                            borderRadius: "50%",
                            padding: "15px",
                            backgroundColor: themes[themeMode].bg.buttonPrimary,
                            borderTopLeftRadius: "0px",
                            borderBottomLeftRadius: "0px"
                        }}
                    >
                        <FaRegEye style={{ color: "white" }} />
                    </IconButton>}
                {children}
            </Main>
        </Box>
    );
}