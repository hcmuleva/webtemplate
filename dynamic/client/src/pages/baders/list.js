import { useTable } from '@refinedev/core';

import { DeleteButton, EditButton, List, ShowButton } from "@refinedev/antd";
import { Form, Space, Table,Avatar } from 'antd';

const BaderList = () => {
    const { tableQueryResult } = useTable({
        
        meta: {
          populate: ["photo"]
        }
    });
    console.log("tableQueryResult", tableQueryResult)
    const results = tableQueryResult?.data?.data ?? [];

    return (
      <List>
        <Form layout="inline" />
        <br />
        <Table dataSource={results} rowKey="id">
        <Table.Column
          title="bader photo"
          dataIndex="photo"
          key="photo" // Fixed typo here (changed "phot" to "photo")
          render={(photo) => {
            // Check if the photo and its formats exist before accessing the thumbnail URL
            if (photo &&photo[0]?.formats?.thumbnail?.url) {
              return (
                <Avatar size="large" src={photo[0].formats.thumbnail.url}/>
                // <img
                //   src={photo[0].formats.thumbnail.url}
                //   alt="Thumbnail"
                //   style={{ maxWidth: "100px" }}
                // />
              );
            }
            // Return some fallback content if thumbnail URL is not available
            return <span>No Thumbnail</span>;
          }}
        />
          <Table.Column dataIndex="id" title="ID" key="id" />
          <Table.Column dataIndex="name" title="Name" key="name" />
          <Table.Column dataIndex="description" title="Description" key="description" />
          
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
    );
  };

export default BaderList;        