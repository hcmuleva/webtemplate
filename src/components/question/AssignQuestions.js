import React, { useEffect } from 'react';
import { Spin, Space,Transfer } from 'antd';
import { useState } from 'react';
import { useCustom } from '@refinedev/core';
import TruncatedText from './TruncatedText';
import './selectlist.css'
const API_URL = process.env.REACT_APP_API_SERVER
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY

/**
 * TODO:  

 * Completed:
 *  2. Need to make this is a generic and pass source and target as an argument.  --- Harish: Done
 *  3. Need to make this as a generic pass source and target list. --- Harish: Done
 *  4. This component need to return selected list of ids and we can consume it to update either at content level or exam level or course level  --- Harish: Done
 *  7. Need to move this into component section. pages should not have business logics. --- Harish: Done
  
 * Pending:
 *  1. Need to enhance code for model size to be increased and also there are some attribute need to show as a table in list. e.g. sc/mcq etc..
 *  5. Below API call has filter capabilities and we can query and get filtered records. This we will use it next comopoent.
 *  6. Need to add pagination and search capabilities in below component. 

 * @param {*} param0 
 * @returns 
 */
const AssignQuestions = ({existingquestions,setSelectedQuestList}) => {
    const { data, isLoading } = useCustom({
        url: `${API_URL}/api/questions`,
        method: "get",
        // config: {
        //     query: {
        //         title: "Foo bar",
        //     },
        // },
    });
    
    const initialTargetKeys = data?.data?.data?.map(item => item.id) || [];
    const questionList = data?.data?.data?.map(item => ({
      key: item.id.toString(),
      title: item.attributes.name,
    }));
    const [targetKeys, setTargetKeys] = useState(existingquestions);
    const [selectedKeys, setSelectedKeys] = useState([]);  
    const onChange = (nextTargetKeys, direction, moveKeys) => {
      setTargetKeys(nextTargetKeys);
    };
  
    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
      setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };
    const onScroll = (direction, e) => {
    };
    setSelectedQuestList(targetKeys)
    return (
      <div className="modal-content-wrapper">
      <Transfer
        dataSource={questionList}
        titles={['Source', 'Target']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        onSelectChange={onSelectChange}
        onScroll={onScroll}
        render={item => (
          <div>
            <TruncatedText text={item.title} />
          </div>
        )}
      />
   
  </div>
    );
  };
  
  export default AssignQuestions;
  