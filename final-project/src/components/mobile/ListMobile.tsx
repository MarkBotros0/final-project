import { Box, Grid, Typography } from '@mui/material'
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { selectList } from '../../redux/lists/listsSlice';
import { fetchCards, selectCard } from '../../redux/cards/cardsSlice';
import { changeCurrentTask, openModal } from '../../redux/modal/modalSlice';
import { themes } from '../../config/themes';

interface listProps {
    list: {
        name: string;
        id: string;
    },
    colorProp: string
}

const ListMobile = ({ list, colorProp }: listProps) => {

    const themeMode = useAppSelector((state) => state.theme.themeMode)
    const cards = useAppSelector((state) => state.cards.cards)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCards(list.id))
    }, [list])


    const handleEditTask = (task: { name: string, id: string }) => {
        dispatch(openModal({ type: "previewTask" }))
        dispatch(changeCurrentTask({ task }))
        dispatch(selectCard({ card: task }))
        dispatch(selectList(list.id))
    }

    return (
        <Grid item>
            <Box sx={{width:"250px"}} >
                <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
                    <Box style={{ height: "18px", width: "18px", backgroundColor: colorProp, borderRadius: "50%", marginRight: "15px" }}></Box>
                    <Typography sx={{ fontSize: "16px", color: themes[themeMode].drawerText, fontWeight: "bold", textTransform: "uppercase" }}>{list.name} ({cards[list.id]?.length})</Typography>
                </Box>

                {cards.hasOwnProperty(list.id) ? cards[list.id].length > 0 ? cards[list.id].map((card, i) => (
                    <Box key={i} onClick={() => handleEditTask(card)} boxShadow={1}
                        sx={{ "&:hover": { bgcolor: themes[themeMode].taskHover }, cursor: "pointer", bgcolor: themes[themeMode].drawerBg, color: themes[themeMode].appbarText, p: "10px", borderRadius: "8px", mt: "20px" }}>
                        <Typography sx={{fontWeight:"bold"}}>{card.name}</Typography>
                    </Box>

                )) : <Typography sx={{ color: themes[themeMode].drawerText }}>No Tasks</Typography> : <Typography>No Tasks</Typography>}

            </Box>
        </Grid >
    )
}

export default ListMobile