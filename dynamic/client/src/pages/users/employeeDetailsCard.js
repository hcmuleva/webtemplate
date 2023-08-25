import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const styles = {
  card: {
    position: "absolute",
    top: "60px",
    left: "0",
    width: "25%",
    height: "75%",
    padding: "2rem",
    margin: "2rem",
    backgroundColor: "#fef9ef",
    borderRadius: "1rem",
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
    marginTop: "1rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  cardRole: {
    margin: "1rem 0",
    fontSize: "1.2rem",
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
    textAlign: "justify",
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

const EmployeeDetailsCard = (props) => {
  const [employeesList, setEmployeesList] = useState([]);
  // console.log("props", props)
  useEffect(() => {
    setEmployeesList(props?.employees);
  }, []);
  // console.log("props in employee detais", props?.employee?.pictures?.formats?.thumbnail?.url)
  return (
    <div style={styles.card}>
      <button style={styles.cardCloseBtn} onClick={props.handleClose}>
        <MdClose />
      </button>
      {props?.data ?? "" === "" ? (
        <div>
          <div style={styles.cardHeader}>
            <img
              style={styles.cardImg}
              src={props?.employee?.pictures[0]?.formats?.thumbnail?.url ?? ""}
              alt="Profile"
            />
            <h2 style={styles.cardName}>{props?.employee?.firstname ?? ""}</h2>
            <p style={styles.cardRole}>{props?.employee?.lastname ?? ""}</p>
          </div>
          <div style={styles.cardBody}>
            <div style={styles.cardItem}>
              <p style={styles.cardItemLabel}>Category:</p>
              <p style={styles.cardItemValue}>
                {props?.employee?.occupation ?? ""}
              </p>
            </div>
            <div style={styles.cardItem}>
              <p style={styles.cardItemLabel}>Email:</p>
              <p style={styles.cardItemValue}>{props?.employee?.email}</p>
            </div>
            <div style={styles.cardItem}>
              <p style={styles.cardItemLabel}>Marital:</p>
              <p style={styles.cardItemValue}>
                {props?.employee?.marital ?? ""}
              </p>
            </div>
            <div style={styles.cardItem}>
              <p style={styles.cardItemLabel}>Gender:</p>
              <p style={styles.cardItemValue}>{props?.employee?.sex ?? ""}</p>
            </div>
            <div style={styles.cardItem}>
              <p style={styles.cardItemLabel}>Jati:</p>
              <p style={styles.cardItemValue}>{props?.employee?.jati ?? ""}</p>
            </div>
            <div style={styles.cardItem}>
              <p style={styles.cardItemLabel}>Gotra:</p>
              <p style={styles.cardItemValue}>{props?.employee?.gotra ?? ""}</p>
            </div>
            <div style={styles.cardItem}>
              <p style={styles.cardItemLabel}>Father Name:</p>
              <p style={styles.cardItemValue}>
                {props?.employee?.father ?? ""}
              </p>
            </div>
            <div style={styles.cardItem}>
              <p style={styles.cardItemLabel}>Mother Name:</p>
              <p style={styles.cardItemValue}>
                {props?.employee?.mother ?? ""}
              </p>
            </div>
            <div style={styles.cardItem}>
              <p style={styles.cardItemLabel}>Relationship:</p>
              <p style={styles.cardItemValue}>
                {props?.employee?.relationship ?? ""}
              </p>
            </div>
            {props.employee.department && (
              <div style={styles.cardItem}>
                <p style={styles.cardItemLabel}>DOB:</p>
                <p style={styles.cardItemValue}>{props?.employee?.dob ?? ""}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div style={styles.cardHeader}>
            <h2>{props?.data?.user ?? ""}Family</h2>
          </div>
          <h4>Family Details:</h4>
          <div style={styles.cardBodyTeamMembers}>
            {props.employees
              .filter(
                (childrens) =>
                  childrens.parentId === props.childrens.id.toString()
              )
              .map((childrens) => (
                <div style={styles.cardItemTeam} key={childrens.id}>
                  <img
                    style={styles.cardItemImg}
                    src={data?.pictures[0] ?? ""}
                    alt="Profile"
                  />
                  <p style={styles.cardItemName}>
                    {props?.employee?.firstname ?? ""}
                  </p>
                  <p style={styles.cardItemRole}>
                    {props?.employee?.occuopation ?? ""}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
      <div style={styles.cardItem}>
        <p style={styles.cardItemLabel}>Divyang Description:</p>
        <p style={styles.cardItemValue}>
          {props?.employee?.divyangdescription ?? ""}
        </p>
      </div>
    </div>
  );
};

export default EmployeeDetailsCard;
