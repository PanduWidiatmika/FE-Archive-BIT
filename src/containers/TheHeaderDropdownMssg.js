import CIcon from '@coreui/icons-react';
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react';
import format from 'date-fns/format';
import moment from 'moment';
import React, { Component } from 'react';
import { api } from 'src/views/plugins/api';
import swal from 'sweetalert';
import FormUpdateDelete from 'src/views/calendar/FormUpdateDelete';
class TheHeaderDropdownMssg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: "",
          title: "",
          description: "",
          location: "",
          start: "",
          end: "",
        }
      ],
      categories: [],
      title: "",
      description: "",
      category: "",
      location: "",
      status: "",
      temp: "",
      start: "",
      end: "",
      id: 0,

      cekToken: window.sessionStorage.getItem("token"),
    };
    this.toggleMore = this.toggleMore.bind(this);
  }

  async APIUpdate(id, completed, e) {
    e.preventDefault();
    if (completed === 1) {
      swal("Sorry", "This status has Completed", "error")
    } else if (completed === 0) {
      api.put("/updateEvent", {
        title: this.state.title,
        description: this.state.description,
        category: this.state.category,
        location: this.state.location,
        start: this.state.start,
        end: this.state.end,
        status: this.state.status,
        id: id,
        token: this.state.cekToken
      }).then(async (resp) => { await swal("Success!", resp.data.message, "success"); window.location.reload(); })
    } else {
      await swal("Warning", "Data Failed to Update", "error");
      window.location.reload();
    }
  }

  toggleMore() {
    this.setState({
      more: !this.state.more,
    });
  }

  componentDidMount() {
    api.post(`/statusEventData`, { token: this.state.cekToken }).then(res => {
      this.setState({
        data: res.data,
      })
    });

    api.post(`/getCategories`, { token: this.state.cekToken }).then(categories => {
      this.setState({
        categories: categories.data,
      })
    });
  }

  APISearch(id) {
    this.setState({ id: id });
    api.post(`/findEvent?id=${id}`, { token: this.state.cekToken }).then(events => {
      this.setState({
        title: events.data[0].title,
        description: events.data[0].description,
        category: events.data[0].id_category,
        location: events.data[0].location,
        start: format(new Date(events.data[0].start), `yyyy-MM-dd'T'HH:mm:ss`),
        end: format(new Date(events.data[0].end), `yyyy-MM-dd'T'HH:mm:ss`),
        status: events.data[0].status,
        temp: events.data[0].status,
        id: events.data[0].id,
      })
    });

    this.toggleMore();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleChangeEditor = (editor) => {
    this.setState({
      description: editor.getData()
    })
  }

  render() {
    return (
      <>
        <CDropdown inNav className="c-header-nav-item mx-2" direction="down">
          <CDropdownToggle className="c-header-nav-link" caret={false}>
            <CIcon name="cil-envelope-open" /><CBadge shape="pill" color="info">{this.state.data.length}</CBadge>
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownItem header tag="div" color="light">
              <strong>You have {this.state.data.length} event{this.state.data.length <= 1 ? "" : "s"} uncompleted </strong>
            </CDropdownItem>
            {
              this.state.data.filter((d, i) => i < 6).map((d, i) => {
                return (
                  <div key={i}>
                    <CDropdownItem href="#" onClick={() => this.APISearch(d.id)}>
                      <div className="message">
                        <div className="text-truncate font-weight-bold">
                          <span className="fa fa-exclamation text-danger"></span> {d.title}
                        </div>
                        <div>
                          <small className="text-muted">location: {d.location ? d.location : "-"}</small>
                        </div>
                        <div>
                          <small className="text-muted float-left mt-1">{moment(d.start).format('DD MMM, HH:mm a')} - {moment(d.end).format('DD MMM, HH:mm a')}</small>
                        </div>
                      </div>
                    </CDropdownItem >
                    <CDropdownItem divider />
                  </div>
                )
              })
            }
            <CDropdownItem onClick={() => window.location.href = "http://localhost:3001/#/calendartable"} href="#" className="text-center border-top"><strong>View all messages</strong></CDropdownItem>
          </CDropdownMenu>
        </CDropdown>

        <FormUpdateDelete toggleMore={this.toggleMore} data={this.state} handleChange={this.handleChange} handleChangeEditor={this.handleChangeEditor} id={true} />
      </>
    )
  }
}

export default TheHeaderDropdownMssg