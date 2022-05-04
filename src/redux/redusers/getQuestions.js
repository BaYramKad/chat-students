import { createSlice } from '@reduxjs/toolkit'

const questionSlice = createSlice({
    name: 'quize',
    initialState: {
      questions: [],
      isLoading: false
    },
    reducers: {
      getQuestionsFetch(state, action) {
        state.isLoading = true
      },
      getQuestions(state, action) {
        state.questions = action.payload
        state.isLoading = false 
      }
    }
  })
  
  export const { getQuestionsFetch, getQuestions, rightAnswer } = questionSlice.actions
  export default questionSlice.reducer