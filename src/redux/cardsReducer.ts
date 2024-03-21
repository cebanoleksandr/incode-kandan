import { CardType, Status } from "../utils/types";

const SET_CARDS = 'SET_CARDS';
const ADD_CARD = 'ADD_CARD';
const UPDATE_CARD = 'UPDATE_CARD';
const REMOVE_CARD = 'REMOVE_CARD';

export const userState: InitialState = {
  items: [
    {id: '1', boardId: '1', status: Status.ToDo, date: '21.01.2024, 10:30:00', author: {fullname: 'Alex Cheban', email: 'a@gmail.com', password: '12345678'}, title: 'First card', description: 'Some description'},
    {id: '2', boardId: '1', status: Status.InProgress, date: '21.01.2024, 10:30:00', author: {fullname: 'Alex Cheban', email: 'a@gmail.com', password: '12345678'}, title: 'Second card', description: 'Some description 2'},
    {id: '3', boardId: '1', status: Status.ToDo, date: '21.01.2024, 10:30:00', author: {fullname: 'Alex Cheban', email: 'a@gmail.com', password: '12345678'}, title: 'Third card', description: 'Some description 3'},
  ]
};

type InitialState = {
  items: CardType[];
};

const cardsReducer = (
  state = userState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_CARDS: 
      return {
        ...state,
        items: action.payload
      }
    case ADD_CARD: 
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    case REMOVE_CARD: 
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    case UPDATE_CARD: 
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }

          return item;
        })
      }
  
    default:
      break;
  }
  return state;
}

//action creators

export const setCardsAC = (cards: CardType[]): SetCards => {
  return {
    type: SET_CARDS,
    payload: cards,
  }
}

export const addCardAC = (card: CardType): AddCard => {
  return {
    type: ADD_CARD,
    payload: card,
  }
}

export const updateCardAC = (card: CardType): UpdateCard => {
  return {
    type: UPDATE_CARD,
    payload: card,
  }
}

export const removeCardAC = (cardId: string): RemoveCard => {
  return {
    type: REMOVE_CARD,
    payload: cardId,
  }
}

type SetCards = {
  type: typeof SET_CARDS;
  payload: CardType[];
}

type AddCard = {
  type: typeof ADD_CARD;
  payload: CardType;
}

type UpdateCard = {
  type: typeof UPDATE_CARD;
  payload: CardType;
}

type RemoveCard = {
  type: typeof REMOVE_CARD;
  payload: string;
}

type ActionTypes = 
  | SetCards
  | AddCard
  | UpdateCard
  | RemoveCard;

export default cardsReducer;
