import { useParsed } from "@refinedev/core";
import MDEditor from '@uiw/react-md-editor';
import { Button, Card, Col, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import CreateProfileDialog from './CreateProfile';
import EditProfileDialog from './EditProfile';
import GetUserTable from './GetUserTable';

const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;
const gridStyle = {
    width: '50%',
    textAlign: 'center',
};
const ProfileDataView = ({ profileData }) => {
    console.log("profileData", profileData.attributes)
    return <Row gutter={25}>
        <Row span={24}>
            <Col span={24}>
                <Card.Grid style={gridStyle}><b>Payment Status: </b>{profileData.attributes.paymentstatus}</Card.Grid>
            </Col >
            <Col span={24}>
                <Card.Grid style={gridStyle}><b>Payment Mod: </b>{profileData.attributes.paymentmod}</Card.Grid>
            </Col>


        </Row>
        <Row span={24}>
            <Col span={24}>
                <Card.Grid style={gridStyle}><b>Plan: </b>{profileData.attributes.plan}</Card.Grid>
            </Col>
            <Col span={24}>
                <Card.Grid style={gridStyle}><b>Status: </b>{profileData.attributes.status}</Card.Grid>


            </Col>
        </Row>
        <Row span={24}>
            <Col span={24}>
                <Card.Grid style={gridStyle}><b>Description: </b>              <MDEditor.Markdown source={profileData.attributes.description} />
                </Card.Grid>
            </Col>
            <Col span={24}>
                <Card.Grid style={gridStyle}><b>Requirement: </b>{profileData.attributes.status}</Card.Grid>


            </Col>
        </Row>
    </Row>
   ō
};
const fetchProfileData = async () => {
    try {
        const response = await fetch(`${API_URL}/api/profiles?userid=${userid}&&populate=*`);
        const respdata = await response.json();
        const data = respdata?.data.length > 0 ? respdata.data[0] : null;
        console.log("data", data);
        setProfileData(data);
        setLoading(false);
    } catch (error) {
        setError(error);
        setLoading(false);
    }
};
const ProfileShow = ({ userid }) => {
    //const { userid } = useParams(); // Access the 'userid' parameter from the URL using the useParams hook
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddProfileOpen, setIsAddProfileOpen] = useState(false)
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParsed();
    useEffect(() => {
        // Define a custom function to fetch profile data based on userid
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/profiles?userid=${userid}&&populate=*`);
                const respdata = await response.json();
                const data = respdata?.data.length > 0 ? respdata.data[0] : [];
                console.log("data fully =>", data)
                setProfileData(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [userid, isEditModalOpen]);

    console.log(" profileData?.attributes?.meelan data",  profileData?.attributes?.meelan?.data);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div>
            <CreateProfileDialog userid={userid} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <EditProfileDialog
                userid={userid}
                isEditModalOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                profileData={profileData}

                fetchProfileData={fetchProfileData} // Pass the function here
            />
           
            <Row gutter={16}>

                <Space wrap>
                    {profileData ? (
                        // Show the "Edit" button when profileData is not empty
                        <>
                        <Button type="primary" onClick={() => setIsEditModalOpen(true)}>Edit Profile</Button>
                        </>
                    ) : (
                        // Show the "Create" button when profileData is empty
                        <Button type="primary" onClick={() => setIsModalOpen(true)}>Create Profile</Button>
                    )}
                  
                  
                </Space>
            </Row>

            <Row gutter={16}>

                <Col span={24}>
                    {profileData && <ProfileDataView profileData={profileData} />}
                </Col>


            </Row>
            <Row>
                {profileData && profileData?.attributes?.meelan?.data?<GetUserTable profileData={ profileData?.attributes?.meelan?.data} />:""}
            </Row>
        </div>
    );
};

export default ProfileShow;