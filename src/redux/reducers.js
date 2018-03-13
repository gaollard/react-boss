import {combineReducers} from 'redux'
import {user} from './user.redux'
import {boss} from './boss.redux'
import {chat} from './chat.redux'
import { company } from "./company.redux"
export default combineReducers({user, boss, chat, company})