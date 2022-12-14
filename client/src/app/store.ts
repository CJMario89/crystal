import { configureStore } from '@reduxjs/toolkit'
import requestReducer from '../features/Request/RequestSlice'
import pendingReducer from '../features/Pending/PendingSlice'
import messageReducer from '../components/MessageSlice'

export const store = configureStore({
    reducer: {
        request: requestReducer,
        pending: pendingReducer,
        message: messageReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
  })
  
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch