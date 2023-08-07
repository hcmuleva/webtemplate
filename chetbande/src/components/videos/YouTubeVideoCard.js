import React from 'react';
import YouTube from 'react-youtube';
import NotFound from '../error/NotFound';
export const YouTubeVideoCard = ({ videoId, opts }) => {
    if (!videoId) { return <NotFound /> }
    if (!opts) {
        opts = {
            height: '200',
            width: '100%',
            playerVars: {
                autoplay: 0,
                controls: 0,
            },
        }
    }
    const onReady = (event) => {
        event.target.pauseVideo();
    };
    return (

        <YouTube videoId={videoId} opts={opts} onReady={onReady} />

    );
};
