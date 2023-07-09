import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import { themes } from '../config/themes';
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleTheme } from '../redux/theme/themeSlice';

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 38,
    height: 22,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 3,
        '&.Mui-checked': {
            transform: 'translateX(15px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: "#635FC7",
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 16,
        height: 16,
        borderRadius: 8,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 24 / 2,
        opacity: 1,
        backgroundColor: "#635FC7",
        boxSizing: 'border-box',
    },
}));

export default function CustomizedSwitches() {

    const themeMode = useSelector((state: RootState) => state.theme.themeMode)
    const dispatch = useDispatch()

    return (
        <Box sx={{ color: themes[themeMode].drawerText, bgcolor: themes[themeMode].mainBg, px: "20px", display: "flex", alignItems: "center", justifyContent: "center", py: "10px", borderRadius: "5px" }} >
            <BsSunFill style={{ fontSize: "20px" }} />
            <AntSwitch onChange={() => dispatch(toggleTheme())} sx={{ mx: "20px" }} inputProps={{ 'aria-label': 'ant design' }} />
            <BsFillMoonStarsFill />
        </Box>
    );
}