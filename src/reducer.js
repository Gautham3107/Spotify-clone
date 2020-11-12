
import { findAllByDisplayValue } from "@testing-library/react";
export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    //token: "BQD0hlWk3Xn92PWi2QWr9EuMRtBSyhR1rRcHn1WM9fIDkRjWBbGCbQrYlj9q9h2v_wY2ZfF3XQ5u3uyoAW9Z2EuDeWEkf4yl7ayhxN0MxJcR-KPrOIPOCTEyWMFy14utXrUQG0HZaBFKtC_3ZGGNKkju2-x5KaxJ4keDJ2Dv3b-c8eR",
}


const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };

        case "SET_PLAYING":
            return {
                ...state,
                playing: action.playing,
            };

        case "SET_ITEM":
            return {
                ...state,
                item: action.item,
            };

        case "SET_DISCOVER_WEEKLY":
            return {
                ...state,
                discover_weekly: action.discover_weekly,
            };
    
        case "SET_TOP_ARTISTS":
            return {
                ...state,
                top_artists: action.top_artists,
            };
    
        case "SET_TOKEN":
            return {
                ...state,
                token: action.token,
            };
    
        case "SET_SPOTIFY":
            return {
                ...state,
                spotify: action.spotify,
            };

        case "SET_PLAYLISTS":
            return {
                ...state,
                playlists: action.playlists,
            };
        default:
            return state;
    }
    };

export default reducer;
