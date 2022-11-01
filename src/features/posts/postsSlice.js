//use the Redux Toolkit createSlice function to make a reducer function that knows how to handle our posts data
import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: '1', title: 'First post', content: 'Hi' },
    { id: '2', title: 'Second', content: 'Text' }
]

// Our posts slice is responsible for handling all updates to the posts data
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        // createSlice will automatically generate an "action creator" function with the same name.
        // We can export that action creator and use it in our UI components to dispatch the action when the user clicks "Save Post".
        postAdded(state, action) {
            state.push(action.payload)
        }
    }
})

export const { postAdded } = postsSlice.actions // If there's more than 1 recuder functions -> export const { postAdded, postDeleted, postEdited } = postsSlice.actions
export default postsSlice.reducer