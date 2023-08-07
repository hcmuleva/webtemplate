import React ,{ useRef } from 'react';
import { Divider } from 'antd';
import { Carousel, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import YouTubeVideoCard from './videocards/YouTubeVideoCard';
import LocalVideoPlayer from './videocards/LocalVideoPlayer';

const CardList = ({ type, list }) => {
    console.log("list",list)
    const carouselRef = useRef(null);
    const carouselLocalRef = useRef(null);
  const handleNext = () => {
    carouselRef.current.next();
  };

  const handleLocalPrev = () => {
    carouselLocalRef.current.prev();
  };
  const handleLocalNext = () => {
    carouselLocalRef.current.next();
  };

  const handlePrev = () => {
    carouselRef.current.prev();
  };
  const getLocalVideo=(list)=>{
    return list.map(elm =><LocalVideoPlayer url={elm.localurl}/>)
    }
  const getCardList = (list) => {
    return list.map((elm) => <YouTubeVideoCard videoId={elm.localurl} />);
  };

  switch (type) {
    case 'YOUTUBE':
        const carouselSettings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            speed: 100,
            autoplay: false,
          };
    
          return (
            <>
              <div style={{ position: 'relative' }}>
                <Button
                  style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
                  onClick={handlePrev}
                  icon={<LeftOutlined />}
                />
                <Carousel {...carouselSettings} ref={carouselRef}>
                  {getCardList(list)}
                </Carousel>
                <Button
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
                  onClick={handleNext}
                  icon={<RightOutlined />}
                />
              </div>
            </>
          );
      
      break;
    case "LOCALVIDEO":
        const carouselLocalSettings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            speed: 100,
            autoplay: true,
          };
    
          return (
            <>
              <div style={{ position: 'relative' }}>
                <Button
                  style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
                  onClick={handleLocalPrev}
                  icon={<LeftOutlined />}
                />
                <Carousel {...carouselLocalSettings} ref={carouselLocalRef}>
                  {getLocalVideo(list)}
                </Carousel>
                <Button
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}
                  onClick={handleLocalNext}
                  icon={<RightOutlined />}
                />
              </div>
            </>
          );

    default:
      break;
  }
  return <div></div>;
};

export default CardList;
