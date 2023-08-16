
import { DashboardOutlined, EnvironmentOutlined } from '@ant-design/icons';
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource
} from "@refinedev/react-router-v6";
import { AuthHelper, DataProvider } from "@refinedev/strapi-v4";
import axios from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";
import Header from "./components/navigation/header";
import { Title } from "./components/navigation/title";
import DashboardCreate from './pages/dashboards/create';
import DashboardList from './pages/dashboards/list';
import DashboardShow from './pages/dashboards/show';
import DashboardEdit from './pages/dashboards/edit';
import UserList from "./pages/users/list";
import UserCreate from "./pages/users/create";
import UserEdit from "./pages/users/edit";
import UserShow from "./pages/users/show";
export const getResource = (userRole) => {
    let resources = [];

    switch (userRole) {
        case 'ADMIN':
            resources = [

                {
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
                    name: "users",
                    create: UserCreate,
                    list: UserList,
                    show: UserShow,
                    edit: UserEdit,
                    meta: {
                        label: "Users",
                        icon: <DashboardOutlined />,
                    }

                }

            ];
            break;
        case 'USER':
            resources = [

                {
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
                    name: "users",
                    create: UserCreate,
                    list: UserList,
                    show: UserShow,
                    edit: UserEdit,
                    meta: {
                        label: "Users",
                        icon: <DashboardOutlined />,
                    }

                }

            ];
            break;
        
            default:
            resources = [


                {
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
                    name: "users",
                    create: UserCreate,
                    list: UserList,
                    show: UserShow,
                    edit: UserEdit,
                    meta: {
                        label: "Users",
                        icon: <DashboardOutlined />,
                    }

                }, {
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
            ];
            break;
    }
    return resources

}
