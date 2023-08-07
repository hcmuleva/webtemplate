import { Avatar, Card, Col, Row } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSimpleList } from "@refinedev/antd";
import { useForm, useShow } from "@refinedev/core";
import Meta from "antd/es/card/Meta";

const style = {
  card: {
    position: "absolute",
    top: "60px",
    left: "0",
    width: "25%",
    height: "75%",
    padding: "2rem",
    margin: "2rem",
    backgroundColor: "#fef9ef",
    borderRadius: "2rem",
    border: "1px solid #d3d3d3",
    overflowY: "scroll",
  },
  cardCloseBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "30px",
    height: "30px",
    color: "#227c9d",
    backgroundColor: "#fef9ef",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #227c9d",
    cursor: "pointer",
  },
  // card::-webkit-scrollbar: {
  //   display: none;
  // },
  cardHeader: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  cardImg: {
    width: "70px",
    borderRadius: "1rem",
  },
  cardName: {
    marginTop: "0.5rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginLeft: "90px",
  },
  cardRole: {
    fontSize: "1.2rem",
    marginLeft: "110px",
  },
  cardBody: {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
  },
  cardBodyTeamMembers: {
    marginTop: "1rem",
    height: "26vh",
    overflowY: "scroll",
  },
  cardItem: {
    width: "100%",
    margin: "0.5rem 0",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.9rem",
  },
  cardItemLabel: {
    margin: "0.5rem 0",
    fontWeight: "bold",
  },
  cardItemValue: {
    marginRight: "150px",
  },
  cardItemTeam: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardItemImg: {
    width: "50px",
    height: "50px",
    margin: "0.2rem",
    borderRadius: "50%",
  },
  cardItemName: {
    marginLeft: "0.5rem",
    fontWeight: "bold",
  },
  cardItemRole: {
    fontSize: "0.8rem",
    marginLeft: "0.5rem",
  },
};

const DetailsCard = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { queryResult } = useShow({
    resource: "users",
    meta: {
      populate: "*",
    },
    id: params.id,
  });

  const { data, isLoading, isError } = queryResult;
  const product = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  const handleGoBack = () => {
    navigate(`/users/show/${params.id}`);
  };

  return (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
      >
        <ArrowLeftOutlined
          style={{ marginRight: "10px", fontSize: "20px" }}
          onClick={handleGoBack}
        />
        <span>Back</span>
      </div>
      <Row gutter={24}>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Card
            style={{
              marginTop: 16,
              backgroundColor: "#d8e5f2",
              display:"flex"
            }}
          >
            <Meta
              avatar={
                <Avatar size={60}
                
                  src={data?.data?.pictures &&( data?.data?.pictures[0]?.formats?.thumbnail?.url ?? "")}
                />
              }
              title= "Personal Details"
            />
            <h2 style={style.cardName}>{data?.data?.firstname ?? ""}</h2>
            <p style={style.cardRole}>{data?.data?.lastname ?? ""}</p>
            <div style={style.cardBody}>
              <div style={style.cardItem}>
                <p style={style.cardItemLabel}>Category:</p>
                <p style={style.cardItemValue}>
                  {data?.data?.occupation ?? ""}
                </p>
              </div>

              <div style={style.cardItem}>
                <p style={style.cardItemLabel}>Email:</p>
                <p style={style.cardItemValue}>{data?.data?.email}</p>
              </div>
              <div style={style.cardItem}>
                <p style={style.cardItemLabel}>Mobile:</p>
                <p style={style.cardItemValue}>{data?.data?.mobile}</p>
              </div>
              <div style={style.cardItem}>
                <p style={style.cardItemLabel}>Marital:</p>
                <p style={style.cardItemValue}>{data?.data?.marital ?? ""}</p>
              </div>
              <div style={style.cardItem}>
                <p style={style.cardItemLabel}>Gender:</p>
                <p style={style.cardItemValue}>{data?.data?.sex ?? ""}</p>
              </div>
              <div style={style.cardItem}>
                <p style={style.cardItemLabel}>Jati:</p>
                <p style={style.cardItemValue}>{data?.data?.jati ?? ""}</p>
              </div>
              <div style={style.cardItem}>
                <p style={style.cardItemLabel}>Gotra:</p>
                <p style={style.cardItemValue}>{data?.data?.gotra ?? ""}</p>
              </div>
              <div style={style.cardItem}>
                <p style={style.cardItemLabel}>Father Name:</p>
                <p style={style.cardItemValue}>{data?.data?.father ?? ""}</p>
              </div>
              <div style={style.cardItem}>
                <p style={style.cardItemLabel}>Mother Name:</p>
                <p style={style.cardItemValue}>{data?.data?.mother ?? ""}</p>
              </div>
              <div style={style.cardItem}>
                <p style={style.cardItemLabel}>Relationship:</p>
                <p style={style.cardItemValue}>
                  {data?.data?.relationship ?? ""}
                </p>
              </div>

              <div style={style.cardItem}>
                <p style={style.cardItemLabel}>DOB:</p>
                <p style={style.cardItemValue}>{data?.data?.dob ?? ""}</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Card
            style={{
              marginTop: 16,
              backgroundColor: "#d8e5f2",
              display:"flex"
            }}
          >
            <Meta
              avatar={
                <Avatar size={60}
                src={data?.data?.pictures &&( data?.data?.pictures[0]?.formats?.thumbnail?.url ?? "")}
                />
              }
              title="Business Details"
            />
            {data?.data?.businesses && data.data.businesses.length > 0 ? (
              <>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>Owner Name:</p>
                  <p style={style.cardItemValue}>
                    {data?.data?.businesses[0]?.ownername ?? ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>Business Name:</p>
                  <p style={style.cardItemValue}>
                    {data?.data?.businesses[0]?.businessname ?? ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>Business Role:</p>
                  <p style={style.cardItemValue}>
                    {(data?.data?.businesses &&
                      data.data.businesses[0].businessrole) ??
                      ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>Business Sector:</p>
                  <p style={style.cardItemValue}>
                    {(data?.data?.businesses &&
                      data.data.businesses[0].businesssector) ??
                      ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>Business Type:</p>
                  <p style={style.cardItemValue}>
                    {(data?.data?.businesses &&
                      data.data.businesses[0].businesstype) ??
                      ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>Business Category:</p>
                  <p style={style.cardItemValue}>
                    {(data?.data?.businesses &&
                      data.data.businesses[0].category) ??
                      ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>Business Size:</p>
                  <p style={style.cardItemValue}>
                    {(data?.data?.businesses && data.data.businesses[0].size) ??
                      ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>Business TurnOver:</p>
                  <p style={style.cardItemValue}>
                    {(data?.data?.businesses &&
                      data.data.businesses[0].turnover) ??
                      ""}
                  </p>
                </div>
              </>
            ) : (
              <p style={{ marginTop: "20px" }}>No business details found.</p>
            )}
          </Card>
          <Card
            style={{
              marginTop: 16,
              backgroundColor: "#d8e5f2",
              display:"flex"
            }}
          >
            <Meta
              avatar={
                <Avatar size={60}
                src={data?.data?.pictures &&( data?.data?.pictures[0]?.formats?.thumbnail?.url ?? "")}
                />
              }
              title="Education Details"
            />
            {data?.data?.educations && data.data.educations.length > 0 ? (
              <>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}> Name:</p>
                  <p style={style.cardItemValue}>
                    {data?.data?.educations[0]?.name ?? ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>Class:</p>
                  <p style={style.cardItemValue}>
                    {data?.data?.educations[0]?.class ?? ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>Branch:</p>
                  <p style={style.cardItemValue}>
                    {(data?.data?.educations &&
                      data.data.educations[0].branch) ??
                      ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>Institute:</p>
                  <p style={style.cardItemValue}>
                    {(data?.data?.educations &&
                      data.data.educations[0].institute) ??
                      ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>Percentage:</p>
                  <p style={style.cardItemValue}>
                    {(data?.data?.educations &&
                      data.data.educations[0].percentage) ??
                      ""}
                  </p>
                </div>
              </>
            ) : (
              <p style={{ marginTop: "20px" }}>No educations details found.</p>
            )}
          </Card>
         
        </Col>
     
      </Row>
     
      <Row gutter={24}>
      <Col xs={24} sm={12} md={12} lg={12} xl={12}>

          <Card
           style={{
            marginTop: 16,
            backgroundColor: "#d8e5f2",
              display:"flex"
          }}
            
          >
            <Meta
              avatar={
                <Avatar size={60}
                src={data?.data?.pictures &&( data?.data?.pictures[0]?.formats?.thumbnail?.url ?? "")}
                  
                />
              }
              title="Addresse Details"
            />
            {data?.data?.addresses && data.data.addresses.length > 0 ? (
              <>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}> AddressType:</p>
                  <p style={style.cardItemValue}>
                    {data?.data?.addresses[0]?.addresstype ?? ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>House Name:</p>
                  <p style={style.cardItemValue}>
                    {data?.data?.addresses[0]?.housename ?? ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>Landmark:</p>
                  <p style={style.cardItemValue}>
                    {(data?.data?.addresses &&
                      data.data.addresses[0].landmark) ??
                      ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>Village:</p>
                  <p style={style.cardItemValue}>
                    {(data?.data?.addresses &&
                      data.data.addresses[0].village) ??
                      ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>Tehsil:</p>
                  <p style={style.cardItemValue}>
                    {(data?.data?.addresses && data.data.addresses[0].tehsil) ??
                      ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>District:</p>
                  <p style={style.cardItemValue}>
                    {(data?.data?.addresses &&
                      data.data.addresses[0].district) ??
                      ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>State:</p>
                  <p style={style.cardItemValue}>
                    {(data?.data?.addresses && data.data.addresses[0].state) ??
                      ""}
                  </p>
                </div>
                <div style={style.cardItem}>
                  <p style={style.cardItemLabel}>Pincode:</p>
                  <p style={style.cardItemValue}>
                    {(data?.data?.addresses && data.data.addresses[0].pincode) ??
                      ""}
                  </p>
                </div>
              </>
            ) : (
              <p style={{ marginTop: "20px" }}>No addresses details found.</p>
            )}
          </Card>
        </Col>
        
      </Row>
    </div>
  );
};

export default DetailsCard;
