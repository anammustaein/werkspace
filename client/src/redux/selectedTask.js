import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id: "",
    title: "",
    type: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    createdBy: "",
    attendees: [],
}

const selectedTaskSlice = createSlice({
    name: "selectedTask",
    initialState,
    reducers: {
        updateSelectedTask: (state, action) => {
            state._id = action.payload._id
            state.title = action.payload.title
            state.type = action.payload.type
            state.description = action.payload.description
            state.location = action.payload.location
            state.startTime = action.payload.startTime
            state.endTime = action.payload.endTime
            state.createdBy = action.payload.createdBy
            state.attendees = action.payload.attendees
        }
    }
})

export const selectedTaskActions = selectedTaskSlice.actions
export default selectedTaskSlice.reducer
