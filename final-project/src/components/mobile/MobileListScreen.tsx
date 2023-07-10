import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { themes } from '../../config/themes';
import Grid from '@mui/material/Grid/Grid';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { openModal } from '../../redux/modal/modalSlice';
import NoColumnScreen from './NoColumnScreen';
import ListMobile from './ListMobile';
import { Stack } from '@mui/material';

const MobileListScreen = () => {

    const lists = useAppSelector((state) => state.lists.lists)
    const themeMode = useAppSelector((state) => state.theme.themeMode)

    const dispatch = useAppDispatch()

    const colorArr = ["#50BFE6", "#FD3A4A", "#FFF700", "#9C51B6", "#AF6E4D", "#FF007C", "#FFAA1D", "#FF00CC","#50BFE6", "#FD3A4A", "#FFF700", "#9C51B6"]

    return (
        <div style={{ height: "100%" }}>
            {lists.length > 0 ?
                <Stack columnGap={5} overflow={'auto'} direction={'row'} sx={{ mt: "30px", height: "100%", pl: "20px" }}>

                    {lists.map((list, i) => (
                        <ListMobile key={i} colorProp={colorArr[i]} list={list} />
                    ))}

                    <Grid onClick={() => dispatch(openModal({ type: "editBoard" }))} item>
                        <Box boxShadow={1} sx={{
                            width: "250px", height: "200px",
                            bgcolor: themes[themeMode].newCol,
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
                : <NoColumnScreen />
            }
        </div >

    );
}
export default MobileListScreen