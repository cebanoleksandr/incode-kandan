import { Board } from "../utils/types";

const SET_BOARDS = 'SET_BOARDS';
const ADD_BOARD = 'ADD_BOARD';
const UPDATE_BOARD = 'UPDATE_BOARD';
const REMOVE_BOARD = 'REMOVE_BOARD';

export const userState: InitialState = {
  items: [
    {id: '1', title: 'First board', author: {fullname: 'Alex Cheban', email: 'a@gmail.com', password: '12345678'}},
    {id: '2', title: 'Second board', author: {fullname: 'Don Toretto', email: 'd@gmail.com', password: '12345678'}},
    {id: '3', title: 'Third board', author: {fullname: 'Dweyn Jonson', email: 'w@gmail.com', password: '12345678'}},
  ]  // check with some data
};

type InitialState = {
  items: Board[];
};

const boardsReducer = (
  state = userState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_BOARDS: 
      return {
        ...state,
        items: action.payload
      }
    case ADD_BOARD: 
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    case REMOVE_BOARD: 
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    case UPDATE_BOARD: 
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

export const setBoardsAC = (boards: Board[]): SetBoards => {
  return {
    type: SET_BOARDS,
    payload: boards,
  }
}

export const addBoardAC = (board: Board): AddBoard => {
  return {
    type: ADD_BOARD,
    payload: board,
  }
}

export const updateBoardAC = (board: Board): UpdateBoard => {
  return {
    type: UPDATE_BOARD,
    payload: board,
  }
}

export const removeBoardAC = (boardId: string): RemoveBoard => {
  return {
    type: REMOVE_BOARD,
    payload: boardId,
  }
}

type SetBoards = {
  type: typeof SET_BOARDS;
  payload: Board[];
}

type AddBoard = {
  type: typeof ADD_BOARD;
  payload: Board;
}

type UpdateBoard = {
  type: typeof UPDATE_BOARD;
  payload: Board;
}

type RemoveBoard = {
  type: typeof REMOVE_BOARD;
  payload: string;
}

type ActionTypes = 
  | SetBoards
  | AddBoard
  | UpdateBoard
  | RemoveBoard;

export default boardsReducer;
