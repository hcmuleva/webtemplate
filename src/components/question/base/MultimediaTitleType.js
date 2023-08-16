import React from 'react';
import ReactPlayer from 'react-player';

import { Card } from 'antd';

const { Meta } = Card;

const MultimediaTitleType = ({setData, url}) => {
    return (
        <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
    );
};

export default MultimediaTitleType;