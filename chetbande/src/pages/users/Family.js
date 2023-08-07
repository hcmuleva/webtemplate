import React, { useState } from "react";
import { Table, Input, Select, Button } from "antd";
import { useCreate, useShow } from "@refinedev/core";

const FamilyDetails = ({ mobile, userid, familylist }) => {
  const { queryResult } = useShow({
    resource: "users",
    userid: userid,
    metaData: { populate: ["members", "addresses"] },
  });
  const { data: familyData, isLoading } = queryResult;
  const [data, setData] = useState(
    familylist?.map((item) => ({ ...item, key: item.id, isOld: true })) ?? []
  );
  const [editingKey, setEditingKey] = useState("");
  const { mutate } = useCreate();

  const [newFamily, setNewFamily] = useState({
    username: "",
    password: "",
    email: "",
    relation: "",
    mobile: "",
    cast: "",
    relationship: "",
  });

  const columns = [
    {
      title: "Mobile Number",
      dataIndex: "mobile",
      key: "mobile",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.mobile}
          onChange={(e) => handleInputChange(e, record.key, "mobile")}
        />
      ),
    },
    // {
    //     title: "Relationship",
    //     dataIndex: "relationship",
    //     key: "relationship",
    //     editable: true,
    //     render: (_, record) => (
    //       <Input
    //         value={record.relationship}
    //         onChange={(e) => handleInputChange(e, record.key, "relationship")}
    //       />
    //     ),
    //   },
    // {
    //   title: "email",
    //   dataIndex: "email",
    //   key: "email",
    //   editable: true,
    //   render: (_, record) => (
    //     <Input
    //       value={record.email}
    //       onChange={(e) => handleInputChange(e, record.key, "email")}
    //     />
    //   ),
    // },
    {
      title: "Relation",
      dataIndex: "relationship",
      key: "relationship",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.relationship}
          onChange={(value) =>
            handleInputChange(value, record.key, "relationship")
          }
        />
      ),
    },

    {
      title: "cast",
      dataIndex: "cast",
      key: "cast",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.cast}
          onChange={(value) =>
            handleInputChange(value, record.key, "cast")
          }
        />
      ),
    },
  ];

  const handleInputChange = (e, key, field) => {
    const { value } = e.target;
    const updatedData = [...data];
    const target = updatedData.find((item) => item.key === key);
    if (target) {
      target[field] = value;
      setData(updatedData);
    }
  };

  const handleAdd = () => {
    const newData = {
      key: `${data.length + 1}`,
      name: newFamily.name,
      relation: newFamily.relation,
      age: newFamily.age,
      cast: newFamily.cast,
    };
    setData([...data, newData]);
    setNewFamily({
      name: "",
      relation: "",
      age: "",
      cast: "",
    });
  };

  const handleRemove = (key) => {
    const updatedData = data.filter((item) => item.key !== key);
    setData(updatedData);
  };

  const handleSave = (key) => {
    setEditingKey("");
  };

  const handleCancel = () => {
    setEditingKey("");
  };

  const isEditing = (record) => record.key === editingKey;

  const components = {
    body: {
      cell: EditableCell,
    },
  };

  const columnsWithEditability = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const edit = (key) => {
    setEditingKey(key);
  };

  const remove = (key) => {
    handleRemove(key);
  };

  const save = (key) => {
    handleSave(key);
  };

  const cancel = () => {
    handleCancel();
  };

  return (
    <div>
      <div>
        <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          + Add Family Member
        </Button>
      </div>
      <Table
        components={components}
        bordered
        dataSource={data}
        columns={columnsWithEditability}
        rowClassName={() => "editable-row"}
        pagination={false}
      />
      <Button
        type="primary"
        onClick={() => {
          console.log("save data", data);
          data.forEach((item) => {
            if (!item.isOld) {
              const { key, ...remain } = item;

              remain["role"] = 2;
              //remain["age"] = parseInt(item.age);
              const random = "" + Math.floor(Math.random() * 10001);
              console.log("mobile:--", mobile);
              console.log("item:--", remain);
              remain["parents"] = userid;
              remain["email"] = remain.mobile + random + "a@a.com";
              remain["username"] = remain.mobile + random 
              remain["password"] = remain.mobile + random + "a@a.com";

              mutate({
                resource: "users",
                values: remain,
              });
              item["isOld"] = true;
            }
          });
        }}
      >
        Save Family Members
      </Button>
    </div>
  );
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "select" ? (
      <Select style={{ width: "100%" }}>
        <Select.Option value="option1">Option 1</Select.Option>
        <Select.Option value="option2">Option 2</Select.Option>
        <Select.Option value="option3">Option 3</Select.Option>
      </Select>
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default FamilyDetails;
