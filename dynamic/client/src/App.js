  import {
    AuthPage,
    ErrorComponent,
    notificationProvider,
    ThemedLayoutV2,
  } from "@refinedev/antd";
  import { Authenticated, Refine } from "@refinedev/core";
  import { useEffect, useState } from "react";

  import { CanAccess } from "@refinedev/core";

  import { DashboardOutlined, EnvironmentOutlined } from "@ant-design/icons";
  import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
  } from "@refinedev/react-router-v6";
  import { AuthHelper, DataProvider } from "@refinedev/strapi-v4";
  import axios from "axios";
  import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
  import "@refinedev/antd/dist/reset.css";
  import Header from "./components/navigation/header";
  import { Title } from "./components/navigation/title";
  import { getResource } from "./user-path-resources";
  import { RegisterPage } from "./pages/register";
  import { LoginPage } from "./pages/login";
  import { liveProvider } from "@refinedev/ably";

  import { Layout as AntdLayout, Typography } from "antd";

  import { ablyClient } from "./AblyClient";
  import DashboardList from "./pages/dashboards/list";
  import DashboardCreate from "./pages/dashboards/create";
  import DashboardShow from "./pages/dashboards/show";
  import DashboardEdit from "./pages/dashboards/edit";
  import UserList from "./pages/users/list";
  import UserCreate from "./pages/users/create";
  import UserEdit from "./pages/users/edit";
  import UserShow from "./pages/users/show";
  import DetailsCard from "./pages/users/DetailsCard";
  import ProfileShow from "./pages/profiles/show";
import BaderCreate from "./pages/baders/create";
import BaderList from "./pages/baders/list";
import BaderShow from "./pages/baders/show";
import BaderEdit from "./pages/baders/edit";

  const ABLY_API_KEY = process.env.REACT_APP_ABLY_API_KEY;
  const API_URL = process.env.REACT_APP_API_SERVER;
  const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY;

  const App = () => {
  

    const axiosInstance = axios.create();
    const strapiAuthHelper = AuthHelper(API_URL + "/api");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");
    const authProvider = {
      login: async ({ email, password }) => {
        // console.log("email",email,"password",password)
        const { data, status } = await strapiAuthHelper.login(email, password);
        if (status === 200) {
          localStorage.setItem(TOKEN_KEY, data.jwt);
          // console.log(data.user['myrole'])
          setUserRole(data.user["myrole"]);

          setIsLoggedIn(true);

          // set header axios instance
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.jwt}`;

          return {
            success: true,
            redirectTo: "/",
          };
        }
        return {
          success: false,
          error: {
            message: "Login failed",
            name: "Invalid email or password",
          },
        };
      },
      logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        setIsLoggedIn(false);
        setUserRole("");

        return {
          success: true,
          redirectTo: "/login",
        };
      },
      register: async (values) => {
        try {
          console.log("values", values);
          const response = await axios.post(
            API_URL + "/api/auth/local/register",
            {
              username: values.username,
              email: values.email,
              password: values.password,
              myrole: "TEACHER",
            }
          );
          // console.log("response", response)
          // Assuming the API returns a response object with a 'success' property
          if (response.status == 200) {
            // Registration successful
            return {
              success: true,
              message: "Registration successful!",
            };
          } else {
            // Registration failed
            throw new Error("Registration failed. Please try again.");
          }
        } catch (error) {
          // Error occurred during registration
          throw new Error(
            "An error occurred during registration. Please try again."
          );
        }
      },
      onError: async (error) => {
        console.error(error);
        return { error };
      },
      check: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
          return {
            authenticated: true,
          };
        }

        return {
          authenticated: false,
          error: {
            message: "Authentication failed",
            name: "Token not found",
          },
          logout: true,
          redirectTo: "/login",
        };
      },
      getPermissions: async () => null,
      getIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
          return null;
        }
        const { data, status } = await strapiAuthHelper.me(token, {
          metaData: { populate: ["photo", "role"] },
        });
        if (status === 200) {
          // const { id, username, email,photo,role } = data;
          // return  { id, username, email,photo,role }
          return data;
        }
        return null;
      },
    };
    const [userResources, setUserResources] = useState(null);

    useEffect(() => {
      async function loggedInStatus() {
        const status = await authProvider.check();
        return status.authenticated;
      }

      async function userRoleValue() {
        const data = await authProvider.getIdentity();
        if (data) {
          setUserRole(data["myrole"]);
        } else {
          setUserRole("");
        }
      }
      userRoleValue();
      if (loggedInStatus()) {
        async function userResourceValue() {
          const resources = getResource(userRole);
          setUserResources(resources);
        }
        userResourceValue();
      }
    }, [userRole, isLoggedIn]);

    if (!userResources) {
      return null;
    }
    return (
      <BrowserRouter>
        <Refine
          authProvider={authProvider}
          dataProvider={DataProvider(API_URL + "/api", axiosInstance)}
          routerProvider={routerProvider}
          resources={[ {
                    name: "dashboards",
                    create: DashboardCreate,
                    list: DashboardList,
                    show: DashboardShow,
                    edit: DashboardEdit,
                    meta: {
                        label: "Dashboard",
                        icon: <DashboardOutlined />,
                    }

                },
                {
                  name: "baders",
                  create: BaderCreate,
                  list: BaderList,
                  show: BaderShow,
                  edit: BaderEdit,
                  meta: {
                      label: "Bader",
                      icon: <DashboardOutlined />,
                  }

              },
                {
                    name: "users",
                    create: UserCreate,
                    list: UserList,
                    show: UserShow,
                    edit: UserEdit,
                    meta: {
                        label: "Users",
                        icon: <DashboardOutlined />,
                    }

                }]}
        
          options={{
            liveMode: "auto",
            warnWhenUnsavedChanges: true,
            syncWithLocation: true,
          }}
        >
          <Routes>
            <Route
              element={
                <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                  <ThemedLayoutV2 Header={Header} Title={Title}>
                    <CanAccess>
                      <Outlet />
                    </CanAccess>
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route
                index
                element={<NavigateToResource resource="dashboards" />}
              />
              <Route path="/dashboards">
                <Route index element={<DashboardList />} />
                <Route path="create" element={<DashboardCreate />} />
                <Route path="show/:id" element={<DashboardShow />} />
                <Route path="edit/:id" element={<DashboardEdit />} />
              </Route>
              <Route path="/baders">
                <Route index element={<BaderList />} />
                <Route path="create" element={<BaderCreate />} />
                <Route path="show/:id" element={<BaderShow />} />
                <Route path="edit/:id" element={<BaderEdit />} />
              </Route>
              <Route path="/dashboards">
              <Route path="show/:userid" element={<ProfileShow />} />
              </Route>
              <Route path="/users">
                <Route index element={<UserList />} />
                <Route path="create" element={<UserCreate />} />
                <Route
                  path="show/:id"
                  element={<UserShow />}
                />
                <Route path="edit/:id" element={<UserEdit />} />
                <Route path="detail/:id" element={<DetailsCard  />} />
              </Route>
            </Route>
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource resource="dashboards" />
                </Authenticated>
              }
            >
              <Route path="/login" element={<LoginPage></LoginPage>} />
              <Route path="/register" element={<RegisterPage></RegisterPage>} />
            </Route>
            <Route
              element={
                <Authenticated>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
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
