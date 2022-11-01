//use the Redux Toolkit createSlice function to make a reducer function that knows how to handle our posts data
import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: '1', title: 'First post', content: 'Hi' },
    { id: '2', title: 'Second', content: 'Text' }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {}
})

export default postsSlice.reducer