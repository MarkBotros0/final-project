import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { apiKey, apiToken } from '../../config/apiConfig';
import { fetchBoards } from '../boards/boardsSlice';

interface list {
    name: string
    id: string
}

interface listsState {
    lists: list[];
    selectedListId: string
    error: string;
    isLoading: boolean;
}

const initialState: listsState = {
    lists: [],
    selectedListId: '',
    error: '',
    isLoading: false,
};

export const listsSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        fetchListsRequest: (state) => {
            state.isLoading = true;
        },
        fetchListsSuccess: (state, action) => {
            state.isLoading = false;
            state.lists = action.payload;
        },
        fetchListsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }, deleteLists: (state, action) => {
            state.lists = action.payload
        },
        selectList: (state, action) => {
            state.selectedListId = action.payload
        }
    },
});

export const {
    fetchListsRequest,
    fetchListsSuccess,
    fetchListsFailure,
    deleteLists,
    selectList
} = listsSlice.actions;

export const fetchLists = (boardID: string) => (dispatch: Dispatch): void => {
    dispatch(fetchListsRequest());
    fetch(`https://api.trello.com/1/boards/${boardID}/lists?key=${apiKey}&token=${apiToken}`)
        .then((result) => result.json())
        .then((response) => {
            dispatch(fetchListsSuccess(response));
        })
        .catch((error) => {
            dispatch(fetchListsFailure(error));
        });
}

export const editLists = (oldLists: list[], newLists: list[], board: { id: string, name: string }, newName: string) => (dispatch: Dispatch) => {

    // rename board
    if (board.name !== newName) {
        fetch(`https://api.trello.com/1/boards/${board.id}?key=${apiKey}&token=${apiToken}&name=${newName}`, {
            method: 'PUT'
        })
    }

    const commonElements = newLists.filter((obj2) =>
        oldLists.some((obj1) => obj1.id === obj2.id)
    );

    const remainingOldList = oldLists.filter((obj1) =>
        !newLists.some((obj2) => obj2.id === obj1.id)
    );

    // rename Lists
    const renamePromises = commonElements.map(list => {
        const foundObject = oldLists.find((item) => item.id === list.id);
        if (list.name !== foundObject?.name) {
            fetch(`https://api.trello.com/1/lists/${list.id}?key=${apiKey}&token=${apiToken}&name=${list.name}`, {
                method: 'PUT'
            })
                .then(response => response.json())
                .catch(err => console.error(err));
        }
    })

    // delete lists
    const deletePromises = remainingOldList.map(list => {
        const data = JSON.stringify({ closed: true });
        fetch(`https://api.trello.com/1/lists/${list.id}?key=${apiKey}&token=${apiToken}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: data
        })
            .then(response => response.json())
            .catch(err => console.error(err));
    });

    // add new lists
    const addPromises = newLists.map(list => {
        if (list.id == 'newList') {
            fetch(`https://api.trello.com/1/lists?name=${list.name}&idBoard=${board.id}&key=${apiKey}&token=${apiToken}`, {
                method: 'POST'
            })
                .then(response => response.json())
                .catch(err => console.error(err));
        }
    });


    // Wait for all promises to resolve
    return Promise.all([...deletePromises, ...renamePromises, ...addPromises])
        .then(() => {
            dispatch<any>(fetchBoards())
            dispatch<any>(fetchLists(board.id))
        })
        .catch(err => console.error(err));
}

export default listsSlice.reducer;
