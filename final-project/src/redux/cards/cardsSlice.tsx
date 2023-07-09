import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { apiKey, apiToken } from '../../config/apiConfig';
import { fetchLists } from '../lists/listsSlice';

export interface cards {
    [key: string]: card[];
}

export interface card {
    name: string;
    desc: string
    id: string;
    idList: string
}

interface cardsState {
    cards: cards;
    selectedCard: card;
    error: string;
    isLoading: boolean;
}

const initialState: cardsState = {
    cards: {},
    selectedCard: { name: '', id: '', desc: '', idList: '' },
    error: '',
    isLoading: false,
};

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        fetchCardsRequest: (state) => {
            state.isLoading = true;
        },
        fetchCardsSuccess: (state, action) => {
            state.isLoading = false;
            state.cards = {
                ...state.cards,
                [action.payload.listId]: action.payload.cards
            }
        },
        fetchCardsFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        resetCards: (state) => {
            state.cards = {}
        },
        selectCard: (state, action) => {
            state.selectedCard = action.payload.card
        },
        addNewCard: (state, action) => {
            state.cards = {
                ...state.cards,
                [action.payload.listId]: action.payload.card
            }
        }
    },
});

export const {
    fetchCardsRequest,
    fetchCardsSuccess,
    fetchCardsFailure,
    resetCards,
    selectCard,
    addNewCard
} = cardsSlice.actions;

export const fetchCards = (listId: string) => (dispatch: Dispatch) => {
    dispatch(fetchCardsRequest());
    fetch(`https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${apiToken}`)
        .then((result) => result.json())
        .then((response) => {
            dispatch(fetchCardsSuccess({ listId, cards: response }));
        })
        .catch((error) => {
            dispatch(fetchCardsFailure(error));
        });
}

export const addCard = (listId: string, name: string, desc: string) => (dispatch: Dispatch) => {
    fetch(`https://api.trello.com/1/cards?idList=${listId}&key=${apiKey}&token=${apiToken}&name=${name}&desc=${desc}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        console.log(
            `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
    })
        .then(() => {
            dispatch<any>(fetchCards(listId));
        })
        .catch(err => console.error(err));
}

export const deleteCard = (card: card) => (dispatch: Dispatch) => {
    fetch(`https://api.trello.com/1/cards/${card.id}?key=${apiKey}&token=${apiToken}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(() => {
            dispatch<any>(fetchCards(card.idList));
        })
        .catch(err => console.error(err));
}

export const moveCard = (cardId: string, newListId: string, boardId: string) => (dispatch: Dispatch) => {
    fetch(`https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${apiToken}&idList=${newListId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(() => {
            dispatch<any>(fetchLists(boardId))
        })
        .catch(err => console.error(err));

}

export const editCard = (cardId: string, newName: string, newDesc: string, oldListId: string, newListId: string, boardId: string) => (dispatch: Dispatch) => {
    fetch(`https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${apiToken}&name=${newName}&desc=${newDesc}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(() => {
            if (oldListId !== newListId) {
                dispatch<any>(moveCard(cardId, newListId, boardId))
            } else {
                dispatch<any>(fetchLists(boardId))
            }
        })
        .catch(err => console.error(err));
}



export default cardsSlice.reducer;