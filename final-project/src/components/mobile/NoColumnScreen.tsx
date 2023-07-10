import { Box, Grid, Typography } from '@mui/material'
import { openModal } from '../../redux/modal/modalSlice'
import { themes } from '../../config/themes'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

const NoColumnScreen = () => {

    const themeMode = useAppSelector((state) => state.theme.themeMode)
    const dispatch = useAppDispatch()

    return (
        <div>
            <Grid onClick={() => dispatch(openModal({ type: "editBoard" }))} item>
                <Box boxShadow={1} sx={{
                    height: "100%", bgcolor: themes[themeMode].newCol,
                    cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px",
                    '&:hover': { bgcolor: themes[themeMode].taskHover }

                }}>
                    <Typography
                        sx={{ fontSize: "20px", fontWeight: "bold", color: themes[themeMode].drawerText }}>
                        + New Column
                    </Typography>
                </Box>
            </Grid >
        </div>
    )
}

export default NoColumnScreen