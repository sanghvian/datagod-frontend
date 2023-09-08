import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string
  userId?: string
  userCognitoId?: string
  uid: string
  emailAddress: string
  accessToken?: string
}

interface userState {
  value: User | null,
  userLoginRedirectRoadId?: string,
}

const initialState: userState = {
  value: null,
  userLoginRedirectRoadId: ""
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser(state: userState, action: PayloadAction<User>) {
      state.value = { ...state.value, ...action.payload }
    },
  },
});

export const {
  setCurrentUser,
} = userSlice.actions;

export default userSlice.reducer;
