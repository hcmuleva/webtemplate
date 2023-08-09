import {
  DateField,
  getDefaultSortOrder,
  ImageField,
  List,
  useSelect,
  useTable,
  ShowButton,
  EditButton,
  DeleteButton,
} from "@refinedev/antd";
import React, { useState } from "react";
import { Button, Form, Space, Table } from "antd";
import CreateChild from "./CreateChild";
import BusinessProfile from "./Business";
import Education from "./Education";

const UserList = () => {
  const { tableProps, sorter } = useTable({
    initialSorter: [{ field: "id", order: "desc" }],
    queryfn: ()=> fetchData(1,10),
    meta: {
      populate: ["pictures"],
    },
    pagination: {
      pageSize: 20,
    },
  });
  if (typeof tableProps.dataSource == "object") {
    console.log("user tableProps", tableProps);
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);

  const [parentId, setParentId] = useState(null);
  return (
    <div>
      {isModalOpen ? (
        <CreateChild
          parentId={parentId}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        ""
      )}
      {isBusinessModalOpen ? (
        <BusinessProfile
          parentId={parentId}
          isBusinessModalOpen={isBusinessModalOpen}
          setIsBusinessModalOpen={setIsBusinessModalOpen}
        />
      ) : (
        ""
      )}
      {isEducationModalOpen ? (
        <Education
          parentId={parentId}
          isEducationModalOpen={isEducationModalOpen}
          setIsEducationModalOpen={setIsEducationModalOpen}
        />
      ) : (
        ""
      )}
      <List>
        <Form layout="inline" />
        <br />
        <Table
          {...tableProps}
          rowKey="id"
          pagination={{ ...tableProps.pagination, showSizeChanger: true }}
        >
          <Table.Column
            dataIndex="id"
            key="id"
            title="ID"
            defaultSortOrder={getDefaultSortOrder("id", sorter)}
            sorter={{ multiple: 3 }}
          />

          <Table.Column
            dataIndex="id"
            key="id" // Unique key for the column
            title="Profile"
            defaultSortOrder={getDefaultSortOrder("id", sorter)}
            sorter={{ multiple: 3 }}
            render={(val, record) => (
              <>
                {record.pictures !== null && record.pictures.length > 0 ? (
                  <ImageField
                    value={record?.pictures[0].formats.thumbnail.url}
                    width={50}
                    height={50}
                  />
                ) : null}
              </>
            )}
          />
          <Table.Column
            dataIndex="firstname"
            key="id"
            title="Name"
            defaultSortOrder={getDefaultSortOrder("id", sorter)}
            sorter={{ multiple: 2 }}
          />
          <Table.Column
            dataIndex="mobile"
            key="id"
            title="mobile"
            defaultSortOrder={getDefaultSortOrder("id", sorter)}
            sorter={{ multiple: 2 }}
          />
          <Table.Column
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <EditButton size="small" recordItemId={record.id} />
                <ShowButton size="small" recordItemId={record.id} />
                <DeleteButton size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </div>
  );
};

export default UserList;
