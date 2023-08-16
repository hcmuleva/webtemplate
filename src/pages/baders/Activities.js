import { Button } from 'antd';
import React,{useState} from 'react';
import CreateActivityModal from './CreateActivity';

const Activities = ({activitylist,baderid}) => {
    console.log("activitylist", activitylist)
    const[open,setOpen]=useState(false)
    const showModal = () => {
        setOpen(true);
    };
    return (
        <div>
             <Button type="primary" onClick={showModal}>Create Activity</Button>
            <CreateActivityModal open={open} setOpen={setOpen} baderid={baderid}/>
          <h1>  I need to display activie list</h1>
        </div>
    );
};

export default Activities;