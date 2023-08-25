import React, { useState } from "react";
import { Table, Input, Button } from "antd";
import { useCreate } from "@refinedev/core";

const AddressDetails = ({userid, addresslist}) => {
  console.log("addresslist",addresslist)
  // const [data, setData] = useState([]);
  const { mutate } = useCreate();
  const [data, setData] = useState(
    addresslist?.map((item) => ({ ...item, key: item.id, isOld: true })) ?? []
  );
  const [editingKey, setEditingKey] = useState("");
  const [newAddress, setNewAddress] = useState({
    addresstype: "",
    housename: "",
    landmark: "",
    village: "",
    tehsil: "",
    district: "",
    state: "",
    pincode: "",
  });

  const columns = [
    {
      title: "Address Type",
      dataIndex: "addresstype",
      key: "addresstype",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.addresstype}
          onChange={(e) => handleInputChange(e, record.key, "addresstype")}
        />
      ),
    },
    {
      title: "House Name",
      dataIndex: "housename",
      key: "housename",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.housename}
          onChange={(e) => handleInputChange(e, record.key, "housename")}
        />
      ),
    },
    {
      title: "Landmark",
      dataIndex: "landmark",
      key: "landmark",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.landmark}
          onChange={(e) => handleInputChange(e, record.key, "landmark")}
        />
      ),
    },
    {
      title: "Village",
      dataIndex: "village",
      key: "village",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.village}
          onChange={(e) => handleInputChange(e, record.key, "village")}
        />
      ),
    },
    {
      title: "Tehsil",
      dataIndex: "tehsil",
      key: "tehsil",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.tehsil}
          onChange={(e) => handleInputChange(e, record.key, "tehsil")}
        />
      ),
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.district}
          onChange={(e) => handleInputChange(e, record.key, "district")}
        />
      ),
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.state}
          onChange={(e) => handleInputChange(e, record.key, "state")}
        />
      ),
    },
    {
      title: "Pincode",
      dataIndex: "pincode",
      key: "pincode",
      editable: true,
      render: (_, record) => (
        <Input
          value={record.pincode}
          onChange={(e) => handleInputChange(e, record.key, "pincode")}
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

  const handleAdd = () => {
    const newData = {
      key: `${data.length + 1}`,
      addresstype: newAddress.addresstype,
      housename: newAddress.housename,
      landmark: newAddress.landmark,
      village: newAddress.village,
      tehsil: newAddress.tehsil,
      district: newAddress.district,
      state: newAddress.state,
      pincode: newAddress.pincode,
    };
    setData([...data, newData]);
    setNewAddress({
      addresstype: "",
      housename: "",
      landmark: "",
      village: "",
      tehsil: "",
      district: "",
      state: "",
      pincode: "",
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
          + Add Address
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
      <Button type="primary" onClick={()=>{
      console.log("save data",data)
          data.map((item)=>{
            console.log("item",item)
            const {key, ...remain} = item;
           
            remain["pincode"]=parseInt(item.pincode)
            // const fromdate = new Date(item.from);
            // const formattedFromDate = fromdate.toISOString();
            // remain["from"]=formattedFromDate
            // const tilldate = new Date(item.till);
            // const formattedTillDate = tilldate.toISOString();
            // remain["till"]=formattedTillDate
          
            console.log("remain",remain)  
           remain['users_permissions_users']= userid
            mutate({
              resource: "addresses",
              values: remain,
          });
          })

    }}>Save Address</Button>
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
  const inputNode = <Input />;
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

export default AddressDetails;