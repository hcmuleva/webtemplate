import React from 'react';
import YouTube from 'react-youtube';
import { Card } from 'antd';
import { EditButton, ShowButton } from '@refinedev/antd';
const { Meta } = Card;
const YouTubeVideoCard = ({videoId }) => {
    const opts = {
        height: '200',
        width: '100%',
        playerVars: {
          autoplay: 0,
          controls:0,
        },
      };
    
      const onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      };
    const youtubeVideoID=videoId?videoId:"" 
    return (
        <div>
            <Card
    hoverable={false}
    style={{ width: 140 }}
    
  >
    <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <EditButton  size="small" />
        <ShowButton  size="small" />
        <DeleteButton size="small" />
      </div> */}
  </Card>
           
        </div>
    );
};

export default YouTubeVideoCard;