import { ErrorComponent, ThemedLayoutV2 } from "@refinedev/antd";
import { Refine, useNavigation } from "@refinedev/core";
import { useState } from "react";

import { DashboardOutlined, EnvironmentOutlined } from "@ant-design/icons";
import "@refinedev/antd/dist/reset.css";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { AuthHelper, DataProvider } from "@refinedev/strapi-v4";
import axios from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/navigation/header";
import { Title } from "./components/navigation/title";
//import { liveProvider } from "@refinedev/ably";

//import { ablyClient } from "./AblyClient";
import DashboardCreate from "./pages/dashboards/create";
import DashboardEdit from "./pages/dashboards/edit";
import DashboardList from "./pages/dashboards/list";
import DashboardShow from "./pages/dashboards/show";
import RegisterUser from "./pages/users/RegisterUser";

const ABLY_API_KEY = process.env.REACT_APP_ABLY_API_KEY;
const API_URL = process.env.REACT_APP_API_SERVER;
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;
/**
 * This is just for building
 * @returns 
 */
const App = () => {
  const axiosInstance = axios.create();
  const strapiAuthHelper = AuthHelper(API_URL + "/api");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("USER");
const navigate = useNavigation()

  return (
    <BrowserRouter>
      <Refine
        dataProvider={DataProvider(API_URL + "/api", axiosInstance)}
        routerProvider={routerProvider}
        resources={[
          {
            name: "dashboards",
            create: DashboardCreate,
            list: DashboardList,
            show: DashboardShow,
            edit: DashboardEdit,
            meta: {
              label: "Dashboard",
              icon: <DashboardOutlined />,
            },
          },
          {
            name: "users",
            list: RegisterUser,

            meta: {
              label: "Register",
              icon: <DashboardOutlined />,
            },
          },
        ]}
        options={{
          liveMode: "auto",
          warnWhenUnsavedChanges: true,
          syncWithLocation: true,
        }}
      >
        <Routes>
          <Route
            element={
              <ThemedLayoutV2 Header={Header} Title={Title}>
                <Outlet />
              </ThemedLayoutV2>
            }
          >

            <Route index element={<NavigateToResource resource="users" />} />
            <Route path="/users">
              <Route index element={<RegisterUser />} />
            </Route>
            <Route index element={<NavigateToResource resource="dashboards" />} />

            <Route path="/dashboards">
              <Route index element={<DashboardList />} />
              <Route path="create" element={<DashboardCreate />} />
              <Route path="show/:id" element={<DashboardShow />} />
              <Route path="edit/:id" element={<DashboardEdit />} />
            </Route>
          </Route>

          <Route
            element={
              <ThemedLayoutV2>
                <Outlet />
              </ThemedLayoutV2>
            }
          >
            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
      </Refine>
    </BrowserRouter>
  );
};

export default App;
