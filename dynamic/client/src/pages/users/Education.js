import React, { useState } from "react";
import { Table, Input, DatePicker, Button } from "antd";
import { useCreate } from "@refinedev/core";

const EducationForm = ({ userid ,educationlist}) => {
  const [data, setData] = useState(educationlist?.map((item) => ({ ...item, isOld: true })) ?? []);
  console.log("Data ", data , " amd edicatopn list", educationlist)
  //const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const { mutate } = useCreate();

  const [newEducation, setNewEducation] = useState({
    name: "",
    class: "",
    branch: "",
    college: "",
    percentage: "",
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.name}
          onChange={(e) => handleInputChange(e, record.key, "name")}
        />
      ),
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.class}
          onChange={(e) => handleInputChange(e, record.key, "class")}
        />
      ),
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.branch}
          onChange={(e) => handleInputChange(e, record.key, "branch")}
        />
      ),
    },
    
    {
      title: "College/Institute",
      dataIndex: "college",
      key: "college",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.college}
          onChange={(e) => handleInputChange(e, record.key, "college")}
        />
      ),
    },
    // {
    //   title: "From",
    //   dataIndex: "from",
    //   key: "from",
    //   editable: true,
    //   render: (text, record) => (
    //     <DatePicker
    //       value={record.from}
    //       onChange={(date) => handleDateChange(date, record.key, "from")}
    //     />
    //   ),
    // },
    // {
    //   title: "Till",
    //   dataIndex: "till",
    //   key: "till",
    //   editable: true,
    //   render: (text, record) => (
    //     <DatePicker
    //       value={record.till}
    //       onChange={(date) => handleDateChange(date, record.key, "till")}
    //     />
    //   ),
    // },
    {
      title: "Percent",
      dataIndex: "percentage",
      key: "percentage",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.percentage}
          onChange={(e) => handleInputChange(e, record.key, "percentage")}
        />
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <span>
          {editingKey === record.key ? (
            <>
              <Button type="primary" onClick={() => save(record.key)}>
                Save
              </Button>
              <Button onClick={cancel}>Cancel</Button>
            </>
          ) : (
            <>
              <Button onClick={() => edit(record.key)}>Edit</Button>
              <Button onClick={() => remove(record.key)}>Remove</Button>
            </>
          )}
        </span>
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

  const handleDateChange = (date, key, field) => {
    const updatedData = [...data];
    const target = updatedData.find((item) => item.key === key);
    if (target) {
      target[field] = date;
      setData(updatedData);
    }
  };

  const handleAdd = () => {
    const newData = {
      key: `${data.length + 1}`,
      name: newEducation.name,
      class: newEducation.class,
      branch: newEducation.branch,
      college: newEducation.college,
      from: null,
      till: null,
      percent: newEducation.percent,
    };
    setData([...data, newData]);
    setNewEducation({ name: "", class: "", branch: "", college: "", percent: "" });
  };
  console.log("SetData", data)
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
          + Add Education
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
      <Button type="primary" onClick={() => {
        console.log("save data", data)
        data.map((item) => {
          console.log("item", item)
          if (!item.isOld) {
            const { key, ...remain } = item;
            remain["percentage"] = parseFloat(item.percentage)
            // if(item.form){
            //   const fromdate = new Date(item.from);
            //   const formattedFromDate = fromdate.toISOString();
            //   remain["from"] = formattedFromDate
            // }
            // if(item.till){
            //   const tilldate = new Date(item.till);
            // const formattedTillDate = tilldate.toISOString();
            // remain["till"] = formattedTillDate
            // }
            
            console.log("remain", remain)
            remain['userid'] = userid
            mutate({
              resource: "educations",
              values: remain,
            });
          }
        })

      }}>Save Education</Button>
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
  const inputNode = inputType === "date" ? <DatePicker /> : <Input />;
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

export default EducationForm;