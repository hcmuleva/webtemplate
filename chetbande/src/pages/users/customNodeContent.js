import { Row, Col, Space } from "antd";
import React, { Children } from "react";
import { Avatar, Badge } from "antd";

const styles = {
  nodeContainer: {
    minHeight: "150px",
    backgroundColor: "#227c9d",
    color: "#227c9d",
    display: "flex",
    justifyContent: "center",
    borderRadius: "1rem",
  },
  nodeDetails: {
    width: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  nodeContent: {
    display: "flex",
    alignItems: "center",
  },
  nodeTeam: {
    width: "100%",
    textAlign: "center",
  },
  nodeTeamName: {
    marginBottom: "-20px",
    color: "#fef9ef",
    fontSize: "1.5rem",
    marginLeft: "130px",
  },
  nodeTeamMemberImg: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    margin: "0.2rem",
  },
  nodeImg: {
    width: "90px",
    height: "95px",
    borderRadius: "3rem",
    marginRight: "6px",
    marginTop: "-40px",
  },
  nodeInfo: {
    marginLeft: "1.5rem",
    color: "#fef9ef",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  nodeName: {
    paddingBottom: "0.3rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  nodeRole: {
    paddingBottom: "0.5rem",
    fontSize: "1.2rem",
  },
  nodeDepartment: {
    padding: "0.5rem",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ffcb77",
    borderRadius: "1rem",
    color: "#227c9d",
  },
  icon: {
    marginRight: "0.5rem",
  },
};

const CustomNodeContent = (props) => {
  console.log("CustomNodeContent ", props);
  return (
    <>
      <div style={styles.nodeContainer}>
        <div style={styles.nodeDetails}>
          {props?.data?.email === "" ? (
            <div style={styles.nodeContent}>
              <div style={styles.nodeInfo}>
                <div style={styles.firstname}>{props?.data?.firstname}</div>

                {props?.data?.email && (
                  <div style={styles.nodeDepartment}>
                    <FaBuilding style={styles.icon} />
                    <div>{props?.data?.email}</div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={styles.nodeTeam}>
              <Row>
                <Col>
                  <div style={styles.nodeTeamName}>
                    {props?.data?.firstname ?? ""}
                    <br />
                    {props?.data?.cast ?? ""}
                  </div>
                </Col>
                <Col>
                  <img
                    style={styles.nodeImg}
                    src={
                      props?.data?.pictures &&
                      props.data.pictures[0]?.formats?.thumbnail?.url
                        ? props.data.pictures[0].formats.thumbnail.url
                        : "https://www.gauchercommunity.org/wp-content/uploads/2020/09/avatar-placeholder-150x150.png"
                    }
                    alt="Profile"
                  />
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomNodeContent;
