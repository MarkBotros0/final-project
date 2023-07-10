import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { themes } from '../config/themes';
import { openModal } from '../redux/modal/modalSlice';

const ITEM_HEIGHT = 48;

export default function MoreButtonTask() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const themeMode = useAppSelector((state) => state.theme.themeMode)
    const dispatch = useAppDispatch()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        handleClose()
        dispatch(openModal({ type: "deleteTask" }))
    };
    const handleEdit = () => {
        handleClose()
        dispatch(openModal({ type: "editTask" }))
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon sx={{ fontSize: "30px", color: themes[themeMode].drawerText }} />
            </IconButton>

            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                        backgroundColor: themes[themeMode].drawerBg
                    },
                }}
            >

                <MenuItem sx={{ color: themes[themeMode].appbarText }} onClick={handleEdit}>
                    Edit Task
                </MenuItem>
                <MenuItem sx={{ color: themes[themeMode].appbarText }} onClick={handleDelete}>
                    Delete Task
                </MenuItem>

            </Menu>
        </div>
    );
}