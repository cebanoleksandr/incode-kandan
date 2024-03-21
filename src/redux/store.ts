import { combineReducers, createStore, Store } from 'redux';
import notificationReducer from './notificationReducer';
import boardsReducer from './boardsReducer';
import cardsReducer from './cardsReducer';
import commentsReducer from './commentsReducer';

const reducers = combineReducers({
  notification: notificationReducer,
  boards: boardsReducer,
  cards: cardsReducer,
  comments: commentsReducer
});

const store: Store<RootState> = createStore(reducers);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export default store;
