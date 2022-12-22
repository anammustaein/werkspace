import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id: "",
    name: "",
    email: "",
    department: "",
    designation: "",
    workingHours: "",
    status: "",
    workMode: "",
}

const selectedUserSlice = createSlice({
    name: "selectedUser",
    initialState,
    reducers: {
        updateSelectedUser: (state, action) => {
            state._id = action.payload._id
            state.name = action.payload.name 
            state.email = action.payload.email 
            state.department = action.payload.department 
            state.designation = action.payload.designation 
            state.workingHours = action.payload.workingHours 
            state.status = action.payload.status 
            state.workMode = action.payload.workMode
        }
    }
})

export const selectedUserActions = selectedUserSlice.actions
export default selectedUserSlice.reducer