import { Button, Col, Row } from "antd";
import React, { useState } from "react";

export default function InfoPage({ setActiveTab}) {
  const [videoUrls, setVideoUrls] = useState([
    "https://www.youtube.com/watch?v=c2s1-ahjRyE",
    
    "",
    "",
  ]);

  const handleUrlChange = (index, url) => {
    const newVideoUrls = [...videoUrls];
    newVideoUrls[index] = url;
    setVideoUrls(newVideoUrls);
  };
  const MovingText = () => {
    const containerStyle = {
    overflow: "hidden",
    width: "100%",
    height: "100px", // Set an appropriate height for the scrolling container
  };

  const textStyle = {
    whiteSpace: "nowrap",
    animation: "scrollText 10s linear infinite", // Adjust the duration (10s) to control speed
  };

  const keyframes = `
    @keyframes scrollText {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  `;
    const movingTextStyle = {
      position: "relative",
      animation: "moveLeft 5s linear infinite"
    };
  
    return (
      <div className="moving-text">
        <marquee direction="left" scrollamount="20">
        <h1 >Registration for student age above 13 years. Last date of registration is 20th Aug 2023.  Registration fee is Rs 250/- . Please come along with  gardian . Make a payment using PhonePay 9448557651</h1>
        
        </marquee>
      </div>
    );
  };

  return (
    <div>
      <MovingText/>
      <Row gutter={24}>
        {videoUrls.map((url, index) => (
          <Col span={8} key={index}>
            <div>
              {url && (
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeVideoId(url)}`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen={true}
                  title={`video-${index}`}
                />
              )}
            </div>
          </Col>
        ))}
      </Row>
              <Row>
                <Col>
                  <h1><Button onClick={()=>{setActiveTab("tab2")}}>For Registration </Button></h1>
                </Col>
              </Row>
    </div>
  );
}

function getYoutubeVideoId(url) {
  const videoIdRegex = /(?:v=|\/shorts\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(videoIdRegex);
  return match ? match[1] : "";
}
