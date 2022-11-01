import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/posts/postsSlice'

//Every time we create a new slice, we need to add its reducer function to our Redux store
// We want our top-level state object to have a field named "posts" inside, 
// and all the data for "state.posts" will be updated by the postsReducer function when actions are dispatched
export default configureStore({
  reducer: {
    posts: postReducer //  postsReducer is being passed as a reducer field named posts.
  }
})
