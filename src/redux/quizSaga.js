import { call, put, takeEvery } from 'redux-saga/effects'
import { getQuestions } from './redusers/getQuestions'


function* workQuestions() {
    const questions = yield call(() => fetch('https://opentdb.com/api.php?amount=10'))
    const questionsJson = yield questions.json()
    yield put(getQuestions(questionsJson.results))
}


function* questionsSaga() {
    yield takeEvery('quize/getQuestionsFetch', workQuestions)
}

export default questionsSaga