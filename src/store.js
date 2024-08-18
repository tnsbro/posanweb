import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name: 'user',
    initialState: { login: 'false' },
    reducers: {
        login(state, action) {
            state.login = action.payload
        }
    }
})

let selectedclass = createSlice({
    name: 'selectedclass',
    initialState: ['','자율관 1층'],
    reducers: {
        selectclass(state, action) {
            return action.payload
        }
    }
})

let register = createSlice({
    name: 'register',
    initialState: false,
    reducers: {
        registerModal(state, action) {
            return action.payload
        }
    }
})

let communityedit = createSlice({
    name : 'communityedit',
    initialState : false,
    reducers: {
        setEdit(state, action) {
            return action.payload
        } 
    }
})

export default configureStore({
    reducer: {
        user: user.reducer,
        selectedclass: selectedclass.reducer,
        register: register.reducer,
        communityedit : communityedit.reducer,
    }
})

export let { login } = user.actions
export let { selectclass } = selectedclass.actions
export let { registerModal } = register.actions
export let { setEdit } = communityedit.actions