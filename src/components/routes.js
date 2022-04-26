import Login from "./LoginPage/Login"
import MainPage from "./MainPage/MainPage"

export const LOGIN_ROUTE = '/login'
export const CHAT_ROUTE = '/main'

export const loginLogic = [
        {
            path: LOGIN_ROUTE,
            component: Login
        }
    ]

export const chatLogic = [
        {
            path: CHAT_ROUTE,
            component: MainPage
        }
    ]