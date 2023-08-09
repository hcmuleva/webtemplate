import React from 'react';
import NotFound from '../error/NotFound';

export const LocalVideoPlayer = ({url}) => {
    if(!url) {return <NotFound/>}
    return (
        <ReactPlayer url={url} controls />
    );
};
