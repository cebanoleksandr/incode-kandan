const SET_ERROR = 'SET_ERROR';
const SET_WARNING = 'SET_WARNING';
const SET_INFO = 'SET_INFO';
const SET_SUCCESS = 'SET_SUCCESS';
const CLEAR_ERROR = 'CLEAR_ERROR';
const CLEAR_WARNING = 'CLEAR_WARNING';
const CLEAR_INFO = 'CLEAR_INFO';
const CLEAR_SUCCESS = 'CLEAR_SUCCESS';

export const userState: InitialState = {
  error: '',
  warning: '',
  success: '',
  info: ''
};

type InitialState = {
  error: string;
  warning: string;
  success: string;
  info: string;
};

const notificationReducer = (
  state = userState,
  action: ActionTypes,
): InitialState => {
  switch (action.type) {
    case SET_ERROR: 
      return {
        ...state,
        error: action.payload
      }
    case SET_SUCCESS: 
      return {
        ...state,
        success: action.payload
      }
    case SET_WARNING: 
      return {
        ...state,
        warning: action.payload
      }
    case SET_INFO: 
      return {
        ...state,
        info: action.payload
      }
    case CLEAR_ERROR: 
      return {
        ...state,
        error: ''
      }
    case CLEAR_SUCCESS: 
      return {
        ...state,
        success: ''
      }
    case CLEAR_WARNING: 
      return {
        ...state,
        warning: ''
      }
    case CLEAR_INFO: 
      return {
        ...state,
        info: ''
      }
  
    default:
      break;
  }
  return state;
}

//action creators
export const setError = (text: string): SetError => {
  return {
    type: SET_ERROR,
    payload: text,
  }
}

export const setSuccess = (text: string): SetSuccess => {
  return {
    type: SET_SUCCESS,
    payload: text
  }
}

export const setWarning = (text: string): SetWarning => {
  return {
    type: SET_WARNING,
    payload: text,
  }
}

export const setInfo = (text: string): SetInfo => {
  return {
    type: SET_INFO,
    payload: text
  }
}

export const clearError = (): ClearError => {
  return {
    type: CLEAR_ERROR,
  }
}

export const clearSuccess = (): ClearSuccess => {
  return {
    type: CLEAR_SUCCESS
  }
}

export const clearWarning = (): ClearWarning => {
  return {
    type: CLEAR_WARNING
  }
}

export const clearInfo = (): ClearInfo => {
  return {
    type: CLEAR_INFO
  }
}

type SetError = {
  type: typeof SET_ERROR,
  payload: string,
}

type SetSuccess = {
  type: typeof SET_SUCCESS,
  payload: string,
}

type SetWarning = {
  type: typeof SET_WARNING,
  payload: string,
}

type SetInfo = {
  type: typeof SET_INFO,
  payload: string,
}

type ClearError = {
  type: typeof CLEAR_ERROR
}

type ClearSuccess = {
  type: typeof CLEAR_SUCCESS
}

type ClearWarning = {
  type: typeof CLEAR_WARNING
}

type ClearInfo = {
  type: typeof CLEAR_INFO
}

type ActionTypes = 
  | SetError 
  | SetSuccess
  | SetWarning
  | SetInfo
  | ClearError 
  | ClearSuccess
  | ClearWarning
  | ClearInfo;

export default notificationReducer;
