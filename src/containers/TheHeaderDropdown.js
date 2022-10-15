import React, { Component } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import swal from "sweetalert";
import { authToken } from "src/views/plugins/api";

class TheHeaderDropdown extends Component {
  clearToken = function () {
    swal({
      title: "Warning",
      text: "Do you want to logout?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        window.sessionStorage.removeItem("token");
        window.location.reload();
      } else {
        await swal("Logout cancelled!");
        window.location.reload();
      }
    });
  };
  render() {
    return (
      <CDropdown inNav className="c-header-nav-items mx-2" direction="down">

        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            <CImg
              src={"avatars/userimg.png"}
              className="c-avatar-img"
              alt="admin@bootstrapmaster.com"
            />
          </div>
        </CDropdownToggle>

        <CDropdownMenu className="pt-0" placement="bottom-end">

          <CDropdownItem header tag="div" color="light" className="text-center">
            <strong>Account</strong>
          </CDropdownItem>

          <CDropdownItem>
            <CIcon name="cil-user" className="mfe-2" />
            {authToken().urn}
          </CDropdownItem>

          <CDropdownItem divider />

          <CDropdownItem onClick={(e) => this.clearToken()}>
            <CIcon name="cil-lock-locked" className="mfe-2" />
            Log Out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    );
  }
}

export default TheHeaderDropdown;
