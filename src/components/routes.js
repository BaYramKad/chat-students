import Login from "./LoginPage/Login"
import MainPage from "./MainPage/MainPage"
import ResultsPage from "./ResultsPage/ResultsPage"

export const LOGIN_ROUTE = '/login'
export const CHAT_ROUTE = '/main'
export const RESULTS_PAGE = '/main/results'

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

export const resultsLogic = [
        {
            path: RESULTS_PAGE,
            component: ResultsPage
        }
    ]