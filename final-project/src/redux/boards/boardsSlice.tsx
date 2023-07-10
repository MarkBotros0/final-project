import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { apiKey, apiToken } from '../../config/apiConfig';
import { fetchLists } from '../lists/listsSlice';

export interface board {
    name: string;
    id: string;
}

interface boardsState {
    boards: board[];
    error: string;
    isLoading: boolean;
    selectedBoard: {
        name: string;
        id: string;
    }
}

const initialState: boardsState = {
    boards: [],
    error: '',
    isLoading: false,
    selectedBoard: { name: "IACES", id: "60c3c674a17b5d6a19aaa101" }
};

export const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        fetchBoardsRequest: (state) => {
            state.isLoading = true;
        },
        fetchBoardsSuccess: (state, action) => {
            state.isLoading = false;
            state.boards = action.payload;
        },
        fetchBoardsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        selectBoard: (state, action) => {
            state.selectedBoard = action.payload
        },
        deleteSelectedBoard: (state, action) => {
            state.boards = state.boards.filter(board => board.id !== action.payload)
        },
        addBoard: (state, action) => {
            state.boards.push(action.payload.board)
        },
        setFirstBoard: (state) => {
            state.selectedBoard = state.boards[0]
        }
    },
});

export const {
    fetchBoardsRequest,
    fetchBoardsSuccess,
    fetchBoardsFailure,
    selectBoard,
    deleteSelectedBoard,
    addBoard,
    setFirstBoard,
} = boardsSlice.actions;

export const fetchBoards = () => (dispatch: Dispatch) => {
    dispatch(fetchBoardsRequest());
    fetch(
        `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`
    )
        .then((result) => result.json())
        .then((response) => {
            dispatch(fetchBoardsSuccess(response));
            selectBoard(response[1])
        })
        .catch((error) => {
            dispatch(fetchBoardsFailure(error));
        });
};


export const createBoard = (name: string, listNames: string[]) => (dispatch: Dispatch) => {
    fetch(`https://api.trello.com/1/boards/?name=${name}&key=${apiKey}&token=${apiToken}&defaultLists=false`, {
        method: 'POST'
    })
        .then(response => response.json())
        .then((boardData: string) => {
            const newBoard = JSON.parse(boardData)
            listNames.map((listName) => {
                fetch(`https://api.trello.com/1/lists?name=${listName}&idBoard=${newBoard.id}&key=${apiKey}&token=${apiToken}`, {
                    method: 'POST'
                })
                    .then(response => response.json())
                    .catch(err => console.error(err));
            })
            dispatch(addBoard({ board: { name: newBoard.name, id: newBoard.id } }))
            dispatch(selectBoard({ name: newBoard.name, id: newBoard.id }))
            dispatch<any>(fetchLists(newBoard.id))
        })
        .catch(err => console.error(err));
};

export const deleteBoard = (boardId: string) => (dispatch: Dispatch) => {
    fetch(`https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${apiToken}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(text => {
            console.log(text)
            dispatch(deleteSelectedBoard(boardId))
        })
        .catch(err => console.error(err));
}

export default boardsSlice.reducer;
