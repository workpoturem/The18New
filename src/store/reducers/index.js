import { combineReducers } from 'redux';
import worksReducer from '@/store/reducers/worksReducer'

const rootReducer = combineReducers({
  works: worksReducer,
});

export default rootReducer;
