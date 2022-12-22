import { configureStore } from "@reduxjs/toolkit";
import loggedInUserReducer from "./loggedInUser";
import selectedUserReducer from "./selectedUser";
import selectedTaskReducer from "./selectedTask";

export default configureStore({
    reducer: {
        loggedInUser: loggedInUserReducer,
        selectedUser: selectedUserReducer,
        selectedTask: selectedTaskReducer,
    }
});