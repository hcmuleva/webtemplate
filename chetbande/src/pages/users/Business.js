import React, { useState } from "react";
import { Table, Input, Select, Button, Form } from "antd";
import { useCreate, useShow } from "@refinedev/core";

const BusinessDetails = ({ userid, businesslist }) => {
  
  console.log("business list component ", businesslist)
  // const { queryResult } = useShow({
  //   resource: "businesses",
  //   userid: userid,
  //   metaData: { populate: ["members", "addresses"] },
  // });
  // const { data: businessData, isLoading } = queryResult;
  const [data, setData] = useState(
    businesslist?.map((item) => ({ ...item, key: item.id, isOld: true })) ?? []
  );

  const [editingKey, setEditingKey] = useState("");
  const { mutate } = useCreate();

  const [newBusiness, setNewBusiness] = useState({
     
    ownername: "",
    businessname: "",
    category: "",
    businesstype: "",
    businessrole: "",
    turnover: "",
    size: "",
    businesssector: "",
  });

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    //   editable: true,
    //   render: (_, record) => (
    //     <Input
    //       value={record.id}
    //       onChange={(e) => handleInputChange(e, record.key, "id")}
    //     />
    //   ),
    // },
    {
      title: "Owner Name",
      dataIndex: "ownername",
      key: "ownername",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.ownername}
          onChange={(e) => handleInputChange(e, record.key, "ownername")}
        />
      ),
    },
    {
      title: "Business Name",
      dataIndex: "businessname",
      key: "businessname",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.businessname}
          onChange={(e) => handleInputChange(e, record.key, "businessname")}
        />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.category}
          onChange={(value) => handleInputChange(value, record.key, "category")}
        />
      ),
    },
    {
      title: "Business Type",
      dataIndex: "businesstype",
      key: "businesstype",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.businesstype}
          onChange={(e) => handleInputChange(e, record.key, "businesstype")}
        />
      ),
    },
    {
      title: "Business Role",
      dataIndex: "businessrole",
      key: "businessrole",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.businessrole}
          onChange={(value) =>
            handleInputChange(value, record.key, "businessrole")
          }
        />
      ),
    },
    {
      title: "Turnover",
      dataIndex: "turnover",
      key: "turnover",
      editable: true,
      render: (_, record) => (
        <Input
        type="number"
          value={record.turnover}
          onChange={(e) => handleInputChange(e, record.key, "turnover")}
        />
      ),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      editable: true,
      render: (_, record) => (
        <Input
        type="number"
          value={record.size}
          onChange={(e) => handleInputChange(e, record.key, "size")}
        />
      ),
    },
    {
      title: "Business Sector",
      dataIndex: "businesssector",
      key: "businesssector",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.businesssector}
          onChange={(value) =>
            handleInputChange(value, record.key, "businesssector")
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
       
      ownername: newBusiness.ownername,
      businessname: newBusiness.businessname,
      category: newBusiness.category,
      businesstype: newBusiness.businesstype,
      businessrole: newBusiness.businessrole,
      turnover: newBusiness.turnover,
      size: newBusiness.size,
      businesssector: newBusiness.businesssector,
    };
    setData([...data, newData]);
    setNewBusiness({
       
      ownername: "",
      businessname: "",
      category: "",
      businesstype: "",
      businessrole: "",
      turnover: "",
      size: "",
      businesssector: "",
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
          + Add Business Details
        </Button>
      </div>
      <Table
        components={components}
        dataSource={data}
        columns={columnsWithEditability}
        // rowClassName={() => "editable-row"}
        pagination={false}
      />
      <Button
        type="primary"
        onClick={() => {
          // console.log("save data", data);
          data.forEach((item) => {
            if (!item.isOld) {
              const { key, ...remain } = item;
              remain['userid'] = userid
              remain["turnover"] = parseFloat(item.turnover);
              remain["size"] = parseInt(item.size);

              mutate({
                resource: "businesses",
                values: remain,
              });
              item["isOld"] = true;
            }
          });
        }}
      >
        Save Business Details
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

export default BusinessDetails;
