import { Comment } from "../utils/types";

const SET_COMMENTS = 'SET_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const UPDATE_COMMENT = 'UPDATE_COMMENT';
const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const userState: InitialState = {
  items: [
    {id: '1', cardId: '1', text: 'Some comment', date: '21.01.2024, 10:30:00', author: {fullname: 'Alex Cheban', email: 'alex@gmail.com', password: '12345678'}},
    {id: '2', cardId: '1', text: 'Some comment 2', date: '21.01.2024, 10:30:00', author: {fullname: 'Alex Cheban', email: 'alex@gmail.com', password: '12345678'}},
    {id: '3', cardId: '1', text: 'Some comment 3', date: '21.01.2024, 10:30:00', author: {fullname: 'Alex Cheban', email: 'alex@gmail.com', password: '12345678'}},
  ]
};

type InitialState = {
  items: Comment[];
};

const commentsReducer = (
  state = userState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_COMMENTS: 
      return {
        ...state,
        items: action.payload
      }
    case ADD_COMMENT: 
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    case REMOVE_COMMENT: 
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    case UPDATE_COMMENT: 
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
export const setCommentsAC = (comments: Comment[]): SetComments => {
  return {
    type: SET_COMMENTS,
    payload: comments,
  }
}

export const addCommentAC = (comment: Comment): AddComment => {
  return {
    type: ADD_COMMENT,
    payload: comment,
  }
}

export const updateCommentAC = (comment: Comment): UpdateComment => {
  return {
    type: UPDATE_COMMENT,
    payload: comment,
  }
}

export const removeCommentAC = (commentId: string): RemoveComment => {
  return {
    type: REMOVE_COMMENT,
    payload: commentId,
  }
}

type SetComments = {
  type: typeof SET_COMMENTS;
  payload: Comment[];
}

type AddComment = {
  type: typeof ADD_COMMENT;
  payload: Comment;
}

type UpdateComment = {
  type: typeof UPDATE_COMMENT;
  payload: Comment;
}

type RemoveComment = {
  type: typeof REMOVE_COMMENT;
  payload: string;
}

type ActionTypes = 
  | SetComments
  | AddComment
  | UpdateComment
  | RemoveComment;

export default commentsReducer;
