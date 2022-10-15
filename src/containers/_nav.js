import React from "react";
import CIcon from "@coreui/icons-react";
import { authToken } from "src/views/plugins/api";
import { freeSet } from '@coreui/icons'

const nav = () => {
  if (cekToken) {
    if (authToken().rid === 0) {
      return [
        {
          _tag: "CSidebarNavItem",
          name: "Dashboard",
          to: "/dashboard",
          icon: (
            <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
          ),
        },
        {
          _tag: 'CSidebarNavTitle',
          _children: ['Menu']
        },
        {
          _tag: "CSidebarNavDropdown",
          name: "User Management",
          icon: "cil-user",
          _children: [
            {
              _tag: "CSidebarNavItem",
              name: "Users",
              to: "/viewAdminPage",
            },
          ],
        },
        {
          _tag: "CSidebarNavDropdown",
          name: "Archives Management",
          route: "/fm",
          icon: <CIcon content={freeSet.cilFolderOpen} customClasses="c-sidebar-nav-icon" />,
          _children: [
            {
              _tag: "CSidebarNavItem",
              name: "Archives",
              to: "/fm",
            }
          ]
        },
        {
          _tag: "CSidebarNavDropdown",
          name: "Event Management",
          route: "/calendar",
          icon: "cil-calendar",
          _children: [
            {
              _tag: "CSidebarNavItem",
              name: "Calendar",
              to: "/calendar",
            },
            {
              _tag: "CSidebarNavItem",
              name: "Category",
              to: "/category",
            },
          ],
        },
        {
          _tag: "CSidebarNavDropdown",
          name: "Ticket Management",
          route: "/ticket",
          icon: <CIcon content={freeSet.cilEnvelopeLetter} customClasses="c-sidebar-nav-icon" />,
          _children: [
            {
              _tag: 'CSidebarNavItem',
              name: 'Tickets',
              to: '/ticket',
            },
            {
              _tag: 'CSidebarNavItem',
              name: 'Chattings',
              to: '/liveChat',
            },
          ],
        },
        {
          _tag: "CSidebarNavDivider",
        },

        {
          _tag: "CSidebarNavDivider",
          className: "m-2",
        },
        {
          _tag: "CSidebarNavDivider",
          className: "m-2",
        },
      ];
    } else {
      return [
        {
          _tag: "CSidebarNavItem",
          name: "Dashboard",
          to: "/dashboard",
          icon: (
            <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
          ),
        },
        {
          _tag: 'CSidebarNavTitle',
          _children: ['Menu']
        },
        {
          _tag: "CSidebarNavDropdown",
          name: "Archives Management",
          route: "/fm",
          icon: <CIcon content={freeSet.cilFolderOpen} customClasses="c-sidebar-nav-icon" />,
          _children: [
            {
              _tag: "CSidebarNavItem",
              name: "Archives",
              to: "/fm",
            }
          ]
        },
        {
          _tag: "CSidebarNavDropdown",
          name: "Event Management",
          route: "/calendar",
          icon: "cil-calendar",
          _children: [
            {
              _tag: "CSidebarNavItem",
              name: "Calendar",
              to: "/calendar",
            },
            // {
            //   _tag: 'CSidebarNavItem',
            //   name: 'Category',
            //   to: '/category',
            // },
          ],
        },
        {
          _tag: "CSidebarNavDropdown",
          name: "Ticket Management",
          route: "/ticket",
          icon: <CIcon content={freeSet.cilEnvelopeLetter} customClasses="c-sidebar-nav-icon" />,
          _children: [
            {
              _tag: 'CSidebarNavItem',
              name: 'Tickets',
              to: '/ticket',
            },
            {
              _tag: 'CSidebarNavItem',
              name: 'Chattings',
              to: '/liveChat',
            },
          ],
        },
        {
          _tag: "CSidebarNavDivider",
        },

        {
          _tag: "CSidebarNavDivider",
          className: "m-2",
        },
        {
          _tag: "CSidebarNavDivider",
          className: "m-2",
        },
      ];
    }
  } else {
    window.location.href = "http://localhost:3001/#/login";
  }
};

const cekToken = window.sessionStorage.getItem("token");
const _nav = nav();

export default _nav;
