import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { themes } from '../config/themes';
import { Button } from '@mui/material';
import { openModal } from '../redux/modal/modalSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';

const NoListScreen = () => {
    const themeMode = useAppSelector((state) => state.theme.themeMode)
    const dispatch = useAppDispatch()

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <Typography sx={{ color: themes[themeMode].drawerText, fontSize: "18px", fontWeight: "bold  " }}>This Task is empty. Create a new column to get started.</Typography>
            <Button onClick={() => dispatch(openModal({ type: 'editBoard' }))}
                sx={{
                    bgcolor: themes[themeMode].bg.buttonPrimary, borderRadius: "30px", textTransform: "none", fontWeight: "bold", fontSize: "15px", mt: "30px", p: "12px 17px",
                    '&:hover': {
                        backgroundColor: themes[themeMode].bg.buttonPrimaryHover,
                    }
                }} variant='contained'>+ Add New Column</Button>
        </Box>
    )
}

export default NoListScreen