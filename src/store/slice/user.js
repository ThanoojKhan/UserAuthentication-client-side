import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
    name: 'userAuth',
    initialState: {
        name: null,
        token: null,
        userId: null,
    },
    reducers: {
        userLogin: (state, action) => {
            state.name = action.payload.name
            state.token = action.payload.token
            state.userId = action.payload.userId
        },
        userLogout: (state, action) => {

            state.name = null
            state.token = null
            state.userId = null
        }
    }
})

export const { userLogin, userLogout } = user.actions
export default user.reducer

