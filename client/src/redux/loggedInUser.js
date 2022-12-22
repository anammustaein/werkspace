import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id: "",
    name: "",
    email: "",
    department: "",
    designation: "",
    workingHours: "",
    status: ""
}

const loggedInUserSlice = createSlice({
    name: "loggedInUser",
    initialState,
    reducers: {
        updateLoggedInUser: (state, action) => {
            state._id = action.payload._id
            state.name = action.payload.name 
            state.email = action.payload.email 
            state.department = action.payload.department 
            state.designation = action.payload.designation 
            state.workingHours = action.payload.workingHours 
            state.status = action.payload.status 
        }
    }
})

export const loggedInUserActions = loggedInUserSlice.actions
export default loggedInUserSlice.reducer
