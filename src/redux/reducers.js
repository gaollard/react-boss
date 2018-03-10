import { combineReducers } from 'redux'
import { user } from './user.redux'
import { boss } from './boss.redux'
export default combineReducers({ user, boss })