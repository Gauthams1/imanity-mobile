import {createStore,applyMiddleware,combineReducers,compose} from 'redux';
import reducer1 from './reducer/reducer1'
const store = createStore(combineReducers({reducer1}));
export default store;
