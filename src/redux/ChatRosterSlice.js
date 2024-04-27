import { createSlice } from '@reduxjs/toolkit'

const ChatRosterSlice = createSlice({
    name: 'ChatRosterSlice',
    initialState: {
        themeData: {
            mode: 'device',
            value: 'light',
        },
        chats: [],
    },
    reducers: {
        addNewChatToRoster(state, action) {
            let chatId = action.payload?.chatId;
            let newChat = {
                _id: chatId,
                chatId: chatId,
                createdAt: Date.now(),
                name: action.payload?.name,
                profilePic: action.payload?.profilePic || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
                messages: []
            }
            state.chats = [...state.chats, newChat]
        },
        sendMessage(state, action) {
            const chatIndex = state?.chats?.findIndex(item => item?.chatId === action.payload?.chatId)
            if (chatIndex !== -1) {
                state.chats[chatIndex] = {
                    ...state.chats[chatIndex],
                    messages: [action.payload?.message, ...state.chats[chatIndex].messages]
                };
            }
        },
        deleteMessage(state, action) {
            const chatIndex = state?.chats?.findIndex(item => item?.chatId === action.payload?.chatId)
            if (chatIndex !== -1) {
                state.chats[chatIndex] = {
                    ...state.chats[chatIndex],
                    messages: [...state.chats[chatIndex].messages]?.filter(item => item?.messageId !== action.payload?.messageId)
                };
            }
        },
        updateAppTheme(state, action) {
            state.themeData.mode = action.payload?.mode || "device"
            state.themeData.value = action?.payload?.value || "light"
        },
    }
})

export const {
    addNewChatToRoster,
    sendMessage,
    deleteMessage,
    updateAppTheme
} = ChatRosterSlice.actions

export default ChatRosterSlice.reducer