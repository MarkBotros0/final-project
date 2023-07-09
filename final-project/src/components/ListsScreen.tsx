import Box from '@mui/material/Box';
import { Typography, Stack } from '@mui/material';
import { themes } from '../config/themes';
import Grid from '@mui/material/Grid/Grid';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import List from './List';
import { openModal } from '../redux/modal/modalSlice';

const ListsScreen = () => {
    const themeMode = useAppSelector((state) => state.theme.themeMode)
    const lists = useAppSelector((state) => state.lists.lists)

    const dispatch = useAppDispatch()

    const colorArr = ["#50BFE6", "#FD3A4A", "#FFF700", "#9C51B6", "#AF6E4D", "#FF007C", "#FFAA1D", "#FF00CC"]

    return (
        <div>
            <Stack gap={5} direction={'row'} sx={{ pt: "30px", height: "100%", pb: "20px", overflow: "auto" }}>

                {lists.map((list, i) => (
                    <Grid key={i} minWidth={150} maxWidth={300} item>
                        <List colorProp={colorArr[i]} list={list} />
                    </Grid>
                ))}

                <Grid onClick={() => dispatch(openModal({ type: "editBoard" }))} item>
                    <Box boxShadow={1} sx={{
                        bgcolor: themes[themeMode].newCol, px: "20px", height: "100%",
                        cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px",
                        '&:hover': { bgcolor: themes[themeMode].taskHover }

                    }}>
                        <Typography
                            sx={{ fontSize: "20px", fontWeight: "bold", color: themes[themeMode].drawerText }}>
                            + New Column
                        </Typography>
                    </Box>
                </Grid >
            </Stack>
        </div >

    );
}
export default ListsScreen