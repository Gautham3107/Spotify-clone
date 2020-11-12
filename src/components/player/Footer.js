import React,{ useEffect,useState } from 'react';
import './Footer.css';
import {useDataLayerValue} from '../../DataLayer';

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import { Grid, Slider } from "@material-ui/core";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { PlayCircleOutline } from '@material-ui/icons';

function Footer({spotify}) {
    const [ { token,item,playing }, dispatch ] = useDataLayerValue();
    //console.log(item);

    useEffect(()=>{
        spotify.getMyCurrentPlaybackState().then((r)=>{
            console.log(r);

            dispatch({
                type: "SET_PLAYING",
                playing: r.is_playing
            });

            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
        });
    },[spotify])

    const handlePausePlay = () =>{
        if (playing) {
            spotify.pause();
            dispatch({
                type: "SET_PLAYING",
                playing: false,
            });
        } else {
            spotify.play();
            dispatch({
                type: "SET_PLAYING",
                playing: true,
            });
        }
    };

    const SkipNext = () => {
        spotify.skipToNext();
        spotify.getMyCurrentPlaybackTrack().then((r)=>{
            dispatch({
                type: "SET_PLAYING",
                playing: true
            });

            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
        });
    }

    const SkipPrevious = () => {
        spotify.skipToPrevious();
        spotify.getMyCurrentPlaybackTrack().then((r)=>{
            dispatch({
                type: "SET_PLAYING",
                playing: true
            });

            dispatch({
                type: "SET_ITEM",
                item: r.item,
            });
        });
    }

    return (
        <div className="footer">
            <div className="footer__left">
                <img className="footer__albumLogo" src={item?.album.images[0].url} alt={item?.name}/>
                {item ? (
                    <div className="footer__songInfo">
                        <h4>{item?.name}</h4>
                        <p>{item?.artists.map((artist) => artist.name).join(", ")}</p>
                    </div>
                ):(
                    <div className="footer__songInfo">
                        <h4>No song is playing</h4>
                        <p>...</p>
                    </div>
                )}
            </div>

            <div className="footer__center">
                <ShuffleIcon className="footer__green"/>
                <SkipPreviousIcon className="footer__icon" onClick={SkipPrevious}/>
                { playing ? (
                    <PauseCircleOutlineIcon className="footer__icon" onClick={handlePausePlay} fontSize="large" />
                ):(
                    <PlayCircleOutline className="footer__icon" onClick={handlePausePlay} fontSize="large" />
                )}
                <SkipNextIcon className="footer__icon" onClick={SkipNext}/>
                <RepeatIcon className="footer__green"/>
            </div>

            <div className="footer__right">
            <Grid container spacing={2}>
            <Grid item>
                <PlaylistPlayIcon />
            </Grid>
            <Grid item>
                <VolumeDownIcon />
            </Grid>
            <Grid item xs>
                <Slider aria-labelledby="continuous-slider" />
            </Grid>
            </Grid>
            </div>
        </div>
    )
}

export default Footer
