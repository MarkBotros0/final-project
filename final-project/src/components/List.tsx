import { Box, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { themes } from '../config/themes'
import { useEffect } from 'react';
import { fetchCards, selectCard } from '../redux/cards/cardsSlice';
import { changeCurrentTask, openModal } from '../redux/modal/modalSlice';
import { selectList } from '../redux/lists/listsSlice';

interface listProps {
    list: {
        name: string;
        id: string;
    },
    colorProp: string
}

const List = ({ list, colorProp }: listProps) => {

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

        <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: "20px" }}>
                <Box style={{ height: "15px", width: "15px", backgroundColor: colorProp, borderRadius: "50%", marginRight: "15px" }}></Box>
                <Typography sx={{ fontSize: "12px", color: themes[themeMode].drawerText, fontWeight: "bold", textTransform: "uppercase" }}>{list.name} ({cards[list.id]?.length})</Typography>
            </Box>

            {cards.hasOwnProperty(list.id) ? cards[list.id].length > 0 ? cards[list.id].map((card, i) => (
                <Box key={i} onClick={() => handleEditTask(card)} boxShadow={1}
                    sx={{ "&:hover": { bgcolor: themes[themeMode].taskHover }, cursor: "pointer", bgcolor: themes[themeMode].drawerBg, color: themes[themeMode].appbarText, p: "10px", borderRadius: "8px", mt: "20px" }}>
                    <Typography>{card.name}</Typography>
                </Box>

            )) : <Typography sx={{ color: themes[themeMode].drawerText }}>No Tasks</Typography> : <Typography>No Tasks</Typography>}

        </Box>

    )
}

export default List