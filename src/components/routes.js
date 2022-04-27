import Login from "./LoginPage/Login"
import MainPage from "./MainPage/MainPage"
import QuizPage from "./ReadyForQuiz"

export const LOGIN_ROUTE = '/login'
export const CHAT_ROUTE = '/main'
export const QUIZ_ROUTE = '/quiz'

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