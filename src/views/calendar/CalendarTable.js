import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow } from '@coreui/react';
import moment from "moment";
import React, { Component } from "react";
import { api } from "src/views/plugins/api";
import format from 'date-fns/format';
import FormUpdateDelete from './FormUpdateDelete';

class CalendarTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],

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

    toggleMore() {
        this.setState({
            more: !this.state.more,
        });
    }

    componentDidMount() {
        api.post(`/statusEventData`, { token: this.state.cekToken }).then(events => {
            this.setState({
                events: events.data,
            })
        });

        api.post(`/getCategories`, { token: this.state.cekToken }).then(categories => {
            this.setState({
                categories: categories.data,
            })
        });
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

    render() {
        return (
            <div className="animated fadeIn">
                <CRow>
                    <CCol xs="12">
                        <CCard>
                            <CCardHeader>
                                <h3>Uncompleted Event Table</h3>
                            </CCardHeader>

                            <CCardBody>
                                <CDataTable
                                    items={this.state.events}
                                    fields={
                                        [
                                            { key: 'No' },
                                            { key: 'Title' },
                                            // { key: 'Description'},
                                            { key: 'Category' },
                                            { key: 'Location' },
                                            { key: 'Start' },
                                            { key: 'End' },
                                            { key: 'Status' },
                                        ]
                                    }
                                    itemsPerPageSelect
                                    itemsPerPage={10}
                                    hover
                                    pagination
                                    onRowClick={(e) => this.APISearch(e.id)}
                                    scopedSlots={{
                                        'No':
                                            (item, i) => (
                                                <td>
                                                    {i + 1}
                                                </td>
                                            ),

                                        'Title':
                                            (item) => {
                                                return (
                                                    <td>
                                                        {item.title}
                                                    </td>
                                                )
                                            },

                                        'Category':
                                            (item) => {
                                                return (
                                                    <td>
                                                        {item.category_name}
                                                    </td>
                                                )
                                            },

                                        'Location':
                                            (item) => {
                                                return (
                                                    <td>
                                                        {item.location ? item.location : "-"}
                                                    </td>
                                                )
                                            },

                                        'Start':
                                            (item) => {
                                                return (
                                                    <td>
                                                        {moment(item.start).format('DD MMM YYYY, HH:mm:ss a')}
                                                    </td>
                                                )
                                            },

                                        'End':
                                            (item) => {
                                                return (
                                                    <td>
                                                        {moment(item.start).format('DD MMM YYYY, HH:mm:ss a')}
                                                    </td>
                                                )
                                            },

                                        'Status':
                                            (item) => {
                                                return (
                                                    <td>
                                                        {item.status ? "Selesai" : "Belum Selesai"}
                                                    </td>
                                                )
                                            },
                                    }}
                                />
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>

                <FormUpdateDelete toggleMore={this.toggleMore} data={this.state} handleChange={this.handleChange} handleChangeEditor={this.handleChangeEditor} />
            </div>
        )
    }
}

export default CalendarTable;