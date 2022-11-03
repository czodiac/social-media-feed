//use the Redux Toolkit createSlice function to make a reducer function that knows how to handle our posts data
import { createSlice, nanoid } from '@reduxjs/toolkit'

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
        postAdded: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        user: userId
                    }
                }
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        }
    }
})

export const { postAdded, postUpdated } = postsSlice.actions
export default postsSlice.reducer