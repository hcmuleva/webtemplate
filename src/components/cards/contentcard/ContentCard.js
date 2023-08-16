import { DeleteButton, EditButton, ShowButton } from '@refinedev/antd';
import ReactPlayer from 'react-player';
import YouTube from 'react-youtube';

import { Badge, Button, Card, Space } from 'antd';
import React from 'react';

const { Meta } = Card;

const ContentCard = ({ list,setIsPlayer, setQueList,setTestId ,setTestType}) => {

  // console.log("questionList", list, " list.que", list.questions);
  const opts = {
    height: '290',
    width: '340',
    playerVars: {
      autoplay: 0,
      controls: 0,
    },
  };

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };
  const getPlayer = (list) => {
    const url = list?.localurl
    const type = list.mediatype
    if (type === "LOCALVIDEO") {
      return <ReactPlayer url={url} controls />;
    } else if (type === "YOUTUBE") {
      return <YouTube videoId={url} opts={opts} onReady={onReady} />
      // Handle other cases if needed
      return null;
    }
  };

  return (
    <Card
      key={list.id}
      hoverable
      style={{
        width: 240,
      }}
      cover={getPlayer(list)}
    >
      <div
        style={{
          display: 'flex',

          alignItems: 'center', // Center align the buttons vertically
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          padding: '4px',
        }}
      >
        <div style={{ textAlign: 'center', alignItems: 'left' }}>
          <EditButton size="small" />
        </div>
        <div style={{ marginLeft: 'auto', textAlign: 'center', alignItems: 'center' }}>
          <ShowButton size="small" title="Que" > <Badge count={`Que${list.questions.length}`} onClick={() => {
            // console.log(list)
            setQueList(list.questions)
            setTestId(list.id)
            setTestType("CONTENT")
            setIsPlayer(true)

          }}>

          </Badge></ShowButton>
        </div>
        <div style={{ marginLeft: 'auto', alignItems: 'right' }}>
          <Badge count={`${list.level}`}>

          </Badge>

        </div>
      </div>
    </Card>
  );
};

export default ContentCard;