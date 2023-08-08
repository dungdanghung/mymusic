import { useContext, createContext, useReducer } from 'react'

const SongContext = createContext()

const SONG_ACTION = {
    SET: 'SET',
    REMOVE: 'REMOVE',
    PLAY: 'PLAY',
    PAUSE: 'PAUSE',
    NEXT: 'NEXT',
    BACK: 'BACK'
}

function songReducer(state, action) {
    switch (action.type) {
        case SONG_ACTION.SET:
            return {
                play: false,
                ...action.payload
            }
        case SONG_ACTION.PLAY:
            return {
                ...state,
                play: true
            }
        case SONG_ACTION.NEXT:
            return {
                ...state,
                next: true
            }
        case SONG_ACTION.BACK:
            return {
                ...state,
                back: true
            }
        case SONG_ACTION.PAUSE:
            return {
                ...state,
                play: false,
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