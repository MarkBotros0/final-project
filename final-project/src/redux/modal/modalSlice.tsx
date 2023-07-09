import { createSlice } from '@reduxjs/toolkit';

interface modalState {
    opened: boolean;
    type: 'editTask' | 'addTask' | 'deleteTask' | 'editBoard' | 'addBoard' | 'deleteBoard' | 'previewTask';
    currentTask: {
        name: string;
        id: string;
        desc: string
    }
    data: {
        name: string;
        description: string;
        status: string;
    }
}

const initialState: modalState = {
    opened: false,
    type: 'addTask',
    currentTask: {
        name:"",
        desc:'',
        id:""
    },
    data: {
        name: '',
        description: '',
        status: ''
    }

};

export const modalSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.type = action.payload.type
            state.opened = true
        },
        closeModal: (state) => {
            state.opened = false
        },
        changeCurrentTask: (state, action) => {
            state.currentTask = action.payload.task
        }
    },
});

export const { openModal, closeModal, changeCurrentTask } = modalSlice.actions;

export default modalSlice.reducer;
