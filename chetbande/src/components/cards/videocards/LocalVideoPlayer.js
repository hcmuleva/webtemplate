import React from 'react';
import ReactPlayer from 'react-player';
import { Card } from 'antd';
import { DeleteButton, EditButton, ShowButton } from '@refinedev/antd';

const { Meta } = Card;
const LocalVideoPlayer = ({ url }) => {
   
  return (
    <div>
        <Card
    hoverable
    style={{ width: 140 }}
    
  >
    <ReactPlayer url={url} controls />
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <EditButton  size="small" />
        <ShowButton  size="small" />
        <DeleteButton size="small" />
      </div>
  </Card>
           
    
    </div>
  );
};

export default LocalVideoPlayer;
