import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/login/Login';
import Player from './components/player/Player';
import { getTokenFromURL } from './spotify';
import SpotfiyWebApi from 'spotify-web-api-js';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotfiyWebApi();

function App() {
  const[{ user,token,playlists },dispatch ] = useDataLayerValue();

  useEffect(()=>{
      const hash = getTokenFromURL();     
      window.location.hash="";
      const _token = hash.access_token;

      if(_token){
        spotify.setAccessToken(_token);
        dispatch({
          type: "SET_TOKEN",
          token: _token,
        })
        spotify.getMe().then((user) =>{
          dispatch({
            type: 'SET_USER',
            user: user
          })
        });
        spotify.getUserPlaylists().then((playlists) => {
          dispatch({
            type: "SET_PLAYLISTS",
            playlists: playlists,
          });
        });
        spotify.getPlaylist("37i9dQZEVXcKsoJWQLO9ce").then(response =>{
          dispatch({
            type: "SET_DISCOVER_WEEKLY",
            discover_weekly: response
          })
        })
      }
  },[])
  return (
    <div className="app">
      { token ? (
          <Player spotify={spotify}/>
        )
        :(
          <Login />
        )
      }


    </div>
  );
}

export default App;
