import { Card, Table } from 'antd';

const data = [
  {
    id: 1,
    name: 'John Doe1',
    age: 25,
    address: '123 Main St',
    details: 'Additional details about John Doe',
  },
  {
    id: 2,
    name: 'John Doe2',
    age: 25,
    address: '123 Main St',
    details: 'Additional details about John Doe',
  },
  {
    id: 3,
    name: 'John Doe3',
    age: 25,
    address: '123 Main St',
    details: 'Additional details about John Doe',
  },
  // Add more data objects...
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  }
 
];

const ExpandableTable = () => {
  const expandedRowRender = (record) => {
    
    return <Card title="CardDATA">{record.details}</Card>;
  };

  return (
    <Table
      dataSource={data}
      columns={columns}
      expandable={{ expandedRowRender }}
    />
  );
};

export default ExpandableTable;
