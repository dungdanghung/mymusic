import { useContext, createContext, useReducer } from 'react'

const SongContext = createContext()

const SONG_ACTION = {
    SET: 'SET',
    REMOVE: 'REMOVE'
}

function songReducer(state, action) {
    switch (action.type) {
        case SONG_ACTION.SET:
            return {
                ...action.payload
            }
        case SONG_ACTION.REMOVE:
            return null
        default:
            return state;
    }
}


function SongProvider({ children }) {
    const [song, dispatchSong] = useReducer(songReducer, null)
    return (
        <SongContext.Provider value={[song, dispatchSong]}>
            {children}
        </SongContext.Provider>
    )
}

function useSongData() {
    return useContext(SongContext)
}

export {
    useSongData,
    SONG_ACTION,
}
export default SongProvider