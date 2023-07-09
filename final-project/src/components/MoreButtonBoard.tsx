import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { themes } from '../config/themes';
import { openModal } from '../redux/modal/modalSlice';

const options = [
  'Edit Board',
  'Delete Board',
];

const ITEM_HEIGHT = 48;

export default function MoreButtonDashBoard() {
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
    dispatch(openModal({ type: "deleteBoard" }))
  };
  const handleEdit = () => {
    handleClose()
    dispatch(openModal({ type: "editBoard" }))
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
          },
        }}
      >
        <MenuItem onClick={handleEdit}>
          Edit Board
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          Delete Board
        </MenuItem>
      </Menu>
    </div>
  );
}