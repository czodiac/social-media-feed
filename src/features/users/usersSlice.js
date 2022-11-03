import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { id: '0', name: 'Tana' },
    { id: '1', name: 'Iltae' },
    { id: '2', name: 'Lym' }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export default usersSlice.reducer