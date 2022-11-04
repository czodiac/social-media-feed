//use the Redux Toolkit createSlice function to make a reducer function that knows how to handle our posts data
import { createSlice, nanoid } from '@reduxjs/toolkit' // nanoid: // To generated a random unique ID
import { sub } from 'date-fns';

const initialState = [
    {
        id: '1',
        title: 'First post',
        content: 'Hi',
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
    },
    {
        id: '2',
        title: 'Second',
        content: 'Text',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }

    }
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
                // Unique IDs and other random values(id, date) should be put in the action, not calculated in the reducer
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        user: userId,
                        date: new Date().toISOString(),
                        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
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
        },
        // Action object just contains the minimum amount of information needed to describe what happened.
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;
            // It's always better to keep the action objects as small as possible, and do the state update calculations in the reducer.
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export default postsSlice.reducer
export const selectAllPosts = state => state.posts;
export const selectPostById = (state, postId) => state.posts.find(post => post.id === postId)
