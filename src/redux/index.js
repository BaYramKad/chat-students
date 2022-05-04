import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import questionsSaga from './quizSaga'

import questionSlice from './redusers/getQuestions'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: {
    questions: questionSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: false
    }).concat(sagaMiddleware)
})
sagaMiddleware.run(questionsSaga)
export default store