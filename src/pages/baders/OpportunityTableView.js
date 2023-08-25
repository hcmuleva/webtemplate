import React, { useState } from "react";
import { Avatar, Button, Card, Divider, List, Modal, Space, Table } from "antd";

import UserTransferList from "./UserTransferList";
import { DeleteButton, EditButton, useTable } from "@refinedev/antd";
import JobOpportunity from "./JobOpportunity";
import "./OpportunityCard.css";
import Apply from "./Apply";

const OpportunityTableView = ({
  baderdata,
  baderid,
  teamid,
  OpportunityList,
}) => {
  const { tableQueryResult } = useTable({
    resource: "opportunities",
  });
  //   console.log("Table props in oportunity table", tableQueryResult?.data?.data);
  const record = tableQueryResult?.data?.data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenApply, setIsModalOpenApply] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //modal for apply button
  const showModalApply = () => {
    setIsModalOpenApply(true);
  };
  const handleOkApply = () => {
    setIsModalOpenApply(false);
  };
  const handleCancelApply = () => {
    setIsModalOpenApply(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Opportunity
      </Button>

      <JobOpportunity
        teamid={teamid}
        baderid={baderid}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />

      <Divider />
      <div className="card-container">
        {record?.map((ele, index) => {
          console.log("record in card", ele);
          return (
            <Card className="upc">
              <div className="gradiant">
                {ele?.name && <span className="profile-name">{ele.name}</span>}
              </div>

              <div className="profile-down">
                <div className="profile-label">Required Employment Type:</div>
                <div className="profile-value">
                  {ele?.employmenttype?.join(", ")}
                </div>

                <div className="profile-label">Category:</div>
                <div className="profile-value">{ele?.category}</div>

                <div className="profile-label">Location:</div>
                <div className="profile-value">{ele?.location}</div>

                <div className="profile-label">Working Schedule:</div>
                <div className="profile-value">
                  {ele?.workingschedule?.join(", ")}
                </div>

                <div className="profile-label">Salary:</div>
                <div className="profile-value">{ele?.salary}</div>

                <div className="profile-label">Interest:</div>
                <div className="profile-value">{ele?.intrest}</div>

                <div className="profile-label">Multiple Positions:</div>
                <div className="profile-value">
                  {ele?.isMultiplePosition ? "Yes" : "No"}
                </div>

                <div className="profile-label">Salary Negotiable:</div>
                <div className="profile-value">
                  {ele?.issalarynagoriable ? "Yes" : "No"}
                </div>

                <div className="profile-label">Job Applicable:</div>
                <div className="profile-value">
                  {ele?.jobapplicable?.join(", ")}
                </div>

                <div className="profile-description">
                  {ele?.discription || "No description available."}
                </div>
                <Divider />
                <Button type="primary" onClick={showModalApply}>
                  Apply Here
                </Button>
                <Apply
                  opportunityid={ele.id}
                  setIsModalOpenApply={setIsModalOpenApply}
                  isModalOpenApply={isModalOpenApply}
                />
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default OpportunityTableView;
