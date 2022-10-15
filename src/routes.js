import React from "react";
import { authToken } from "src/views/plugins/api";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

//User Management
const ViewAdminPage = React.lazy(() => import("./views/um/viewAdminPage"));
const AddUser = React.lazy(() => import("./views/um/addUser"));
const ViewUser = React.lazy(() => import("./views/um/viewUser"));
const EditUser = React.lazy(() => import("./views/um/editUser"));

//File Management
const FM = React.lazy(() => import("./views/fm"));
const FMYear = React.lazy(() => import("./views/fm/year"));
const FMMonth = React.lazy(() => import("./views/fm/month"));
const FMFile = React.lazy(() => import("./views/fm/file"));
const FMView = React.lazy(() => import("./views/fm/view"));
const FMCreate = React.lazy(() => import("./views/fm/create"));
const FMUpdate = React.lazy(() => import("./views/fm/update"));
const FMCreateArchiveType = React.lazy(() =>
  import("./views/fm/createArchiveType")
);
const FMUpdateArchiveType = React.lazy(() =>
  import("./views/fm/updateArchiveType")
);

//Ticket Managemnet Route
const Ticket = React.lazy(() => import('./views/ticket/ticket'));
const ticketView = React.lazy(() => import('./views/ticket/ticket.view'));
const moduleInsert = React.lazy(() => import('./views/ticket/module/module.insert'));

//LIVE CHAT SICKET.IO ROUTE
const LiveChat = React.lazy(() => import('./views/chatting/components/LiveChat'));
const registerRoom = React.lazy(() => import('./views/chatting/components/Register_room'));

//Event Management
const Calendar = React.lazy(() => import("./views/calendar/index"));
const CalendarTable = React.lazy(() =>
  import("./views/calendar/CalendarTable")
);
const Category = React.lazy(() => import("./views/calendar/Category"));

const cekToken = window.sessionStorage.getItem("token");

const cekRoutes = () => {
  if (cekToken) {
    if (authToken().rid === 0) {
      return [
        { path: "/", exact: true, name: "Home" },

        { path: "/dashboard", name: "Dashboard", component: Dashboard },

        {
          path: "/viewAdminPage",
          exact: true,
          name: "Admin Page",
          component: ViewAdminPage,
        },
        { path: "/addUser", exact: true, name: "Add User", component: AddUser },
        {
          path: "/viewUser/:id",
          exact: true,
          name: "View User",
          component: ViewUser,
        },
        {
          path: "/editUser/:id",
          exact: true,
          name: "Edit User",
          component: EditUser,
        },
        { path: "/fm", name: "Archives Management - Folders", component: FM },
        {
          path: "/year/:archive_type",
          name: "Archives Management - Year Folders",
          component: FMYear,
        },
        {
          path: "/month/:archive_type/:archive_year",
          name: "Archives Management - Month Folders",
          component: FMMonth,
        },
        {
          path: "/file/:archive_type/:archive_year/:archive_month",
          name: "Archives Management - Archives",
          component: FMFile,
        },
        {
          path: "/view/:archive_type/:archive_year/:archive_month/:file_id",
          name: "Archives Management - View Archive",
          component: FMView,
        },
        {
          path: "/create/:archive_type",
          name: "Archives Management - Create Archive",
          component: FMCreate,
        },
        {
          path: "/update/:archive_type/:archive_year/:archive_month/:file_id",
          name: "Archives Management - Update Archive",
          component: FMUpdate,
        },
        {
          path: "/create-archive-type",
          name: "Archives Management - Create Folder",
          component: FMCreateArchiveType,
        },
        {
          path: "/update-archive-type/:archive_id",
          name: "Archives Management - Update Folder",
          component: FMUpdateArchiveType,
        },

        { path: "/calendar", name: "Calendar", component: Calendar },
        {
          path: "/calendartable",
          name: "Uncompleted Event",
          component: CalendarTable,
        },
        { path: "/category", name: "Category Table", component: Category },
        { path: '/ticket', exact: true, name: 'Ticket Management', component: Ticket },
        { path: '/tview/:id', exact: true, name: 'Ticket View', component: ticketView },
        { path: '/minsert/:id', exact: true, name: 'Module Insert', component: moduleInsert },
        { path: '/livechat', exact: true, name: 'Live Chat', component: LiveChat },
        { path: '/registerPageRoom', exact: true, name: 'Register Room', component: registerRoom },
      ];
    }
    else {
      return [
        { path: "/", exact: true, name: "Home" },

        { path: "/dashboard", name: "Dashboard", component: Dashboard },

        { path: "/fm", name: "Archives Management - Folders", component: FM },
        {
          path: "/year/:archive_type",
          name: "Archives Management - Year Folders",
          component: FMYear,
        },
        {
          path: "/month/:archive_type/:archive_year",
          name: "Archives Management - Month Folders",
          component: FMMonth,
        },
        {
          path: "/file/:archive_type/:archive_year/:archive_month",
          name: "Archives Management - Archives",
          component: FMFile,
        },
        {
          path: "/view/:archive_type/:archive_year/:archive_month/:file_id",
          name: "Archives Management - View Archive",
          component: FMView,
        },

        { path: "/calendar", name: "Calendar", component: Calendar },
        {
          path: "/calendartable",
          name: "Uncompleted Event",
          component: CalendarTable,
        },
        { path: "/category", name: "Category Table", component: Category },

        { path: '/ticket', exact: true, name: 'Ticket Management', component: Ticket },
        { path: '/tview/:id', exact: true, name: 'Ticket View', component: ticketView },

        { path: '/livechat', exact: true, name: 'Live Chat', component: LiveChat },
      ];
    }
  } else {
    window.location.href = "http://localhost:3001/#/login";
  }
};

const   routes = cekRoutes();

export default routes;
