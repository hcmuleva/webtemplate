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
 
  const fetchData = (start, limit) => {
    // Your data fetching logic using start and limit parameters.
    // For example, if you're using an API call:
    return fetch(`/api/users?start=${start}&limit=${limit}`)
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error fetching data:", error);
        return [];
      });
  };
  
  const { tableProps, sorter } = useTable({
    initialSorter: [{ field: "id", order: "desc" }],
    // queryfn: ()=> fetchData(1,10),
    queryfn: () => fetchData(0, 100),

    meta: {
      populate: ["pictures"],
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

export default  UserList;


// import {
//   DateField,
//   getDefaultSortOrder,
//   ImageField,
//   List,
//   useSelect,
//   useTable,
//   ShowButton,
//   EditButton,
//   DeleteButton,
// } from "@refinedev/antd";
// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { Button, Form, Space, Table } from "antd";
// import CreateChild from "./CreateChild";
// import BusinessProfile from "./Business";
// import Education from "./Education";

// const CreateChildMemo = React.memo(CreateChild);
// const BusinessProfileMemo = React.memo(BusinessProfile);
// const EducationMemo = React.memo(Education);

// const UserList = () => {
//   const { tableProps, sorter, setSorter, fetchData } = useTable({
//     initialSorter: [{ field: "id", order: "desc" }],
//     meta: {
//       populate: ["pictures"],
//     },
//     pagination: {
//       pageSize: 20,
//     },
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);
//   const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);

//   const [parentId, setParentId] = useState(null);

//   const handleSort = useCallback((field, order) => {
//     setSorter([{ field, order }]);
//     fetchData(1, 10);
//   }, [setSorter, fetchData]);

//   useEffect(() => {
//     const fetchDataFromApi = async () => {
//       try {
//         const response = await fetchData(1, 10);
//         // Process the response and set the data in the tableProps, e.g., tableProps.setData(response.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         // Handle error if necessary
//       }
//     };
//     fetchDataFromApi();
//   }, [fetchData]);

//   const renderProfileColumn = useMemo(() => (val, record) => (
//     <>
//       {record.pictures !== null && record.pictures.length > 0 ? (
//         <ImageField
//           value={record?.pictures[0].formats.thumbnail.url}
//           width={50}
//           height={50}
//         />
//       ) : null}
//     </>
//   ), []);

//   const renderNameColumn = useMemo(() => (val, record) => (
//     // Your existing render function code
//     // Replace with the actual rendering logic
//     <span>{record.firstname}</span>
//   ), []);

//   const renderMobileColumn = useMemo(() => (val, record) => (
//     // Your existing render function code
//     // Replace with the actual rendering logic
//     <span>{record.mobile}</span>
//   ), []);

//   return (
//     <div>
//       {isModalOpen && (
//         <CreateChildMemo
//           parentId={parentId}
//           isModalOpen={isModalOpen}
//           setIsModalOpen={setIsModalOpen}
//         />
//       )}
//       {isBusinessModalOpen && (
//         <BusinessProfileMemo
//           parentId={parentId}
//           isBusinessModalOpen={isBusinessModalOpen}
//           setIsBusinessModalOpen={setIsBusinessModalOpen}
//         />
//       )}
//       {isEducationModalOpen && (
//         <EducationMemo
//           parentId={parentId}
//           isEducationModalOpen={isEducationModalOpen}
//           setIsEducationModalOpen={setIsEducationModalOpen}
//         />
//       )}
//       <List>
//         <Form layout="inline" />
//         <br />
//         <Table
//           {...tableProps}
//           rowKey="id"
//           pagination={{ ...tableProps.pagination, showSizeChanger: true }}
//         >
//           <Table.Column
//             dataIndex="id"
//             key="id"
//             title="ID"
//             defaultSortOrder={getDefaultSortOrder("id", sorter)}
//             sorter={{ multiple: 3 }}
//           />

//           <Table.Column
//             dataIndex="id"
//             key="id"
//             title="Profile"
//             defaultSortOrder={getDefaultSortOrder("id", sorter)}
//             sorter={{ multiple: 3 }}
//             render={renderProfileColumn}
//           />
//           <Table.Column
//             dataIndex="firstname"
//             key="id"
//             title="Name"
//             defaultSortOrder={getDefaultSortOrder("id", sorter)}
//             sorter={{ multiple: 2 }}
//             render={renderNameColumn}
//           />
//           <Table.Column
//             dataIndex="mobile"
//             key="id"
//             title="mobile"
//             defaultSortOrder={getDefaultSortOrder("id", sorter)}
//             sorter={{ multiple: 2 }}
//             render={renderMobileColumn}
//           />
//           <Table.Column
//             title="Actions"
//             dataIndex="actions"
//             render={(_, record) => (
//               <Space>
//                 <EditButton size="small" recordItemId={record.id} />
//                 <ShowButton size="small" recordItemId={record.id} />
//                 <DeleteButton size="small" recordItemId={record.id} />
//               </Space>
//             )}
//           />
//         </Table>
//       </List>
//     </div>
//   );
// };

// export default UserList;
