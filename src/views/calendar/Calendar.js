import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { Component } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { api, authToken } from '../plugins/api';
import FormInsert from './FormInsert';
import FormUpdateDelete from './FormUpdateDelete';

const locales = { "en-US": require("date-fns/locale/en-US") }

const localizer = dateFnsLocalizer({
    format, parse, startOfWeek, getDay, locales
})

class Calendars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [
            ],
            categories: [],
            title: "",
            description: "",
            category: "",
            location: "",
            status: 0,
            temp: "",
            id: 0,
            start: format(new Date(), `yyyy-MM-dd'T'HH:mm:ss`),
            end: format(new Date(), `yyyy-MM-dd'T'HH:mm:ss`),
            completed_at: "",

            cekToken: window.sessionStorage.getItem("token"),

            more: false,
            success: false,
        };
        this.toggleSuccess = this.toggleSuccess.bind(this);
        this.toggleMore = this.toggleMore.bind(this);
    }

    toggleMore() {
        this.setState({
            more: !this.state.more,
        });
    }
    toggleSuccess() {
        this.setState({
            success: !this.state.success,
        });
    }

    componentDidMount() {
        api.post(`/getEvent`, { token: this.state.cekToken }).then(async events => {

            let array = []

            await events.data.forEach((d, i) => {

                const updateData = {

                    id: d.id,
                    title: d.title,
                    description: d.description,
                    category: d.id_category,
                    location: d.location,
                    start: new Date(d.start),
                    end: new Date(d.end),
                    // start: new Date(start.getFullYear(), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()),
                    // end: new Date(end.getFullYear(), end.getMonth(), end.getDate() + 1, end.getHours(), end.getMinutes(), end.getSeconds(), end.getMilliseconds()),
                    status: d.status,
                }

                array.push(updateData)
            })
            this.setState({
                events: array,
            })

        });

        api.post(`/getCategories`, { token: this.state.cekToken }).then(categories => {
            this.setState({
                categories: categories.data,
            })
        });
    }

    APISearch(e) {
        api.post(`/findEvent?id=${e.id}`, { token: this.state.cekToken }).then(events => {
            if (authToken().rid === 0) {
                this.setState({
                    id: e.id,
                    title: events.data[0].title,
                    description: events.data[0].description,
                    category: events.data[0].id_category,
                    location: events.data[0].location,
                    start: format(new Date(events.data[0].start), `yyyy-MM-dd'T'HH:mm:ss`),
                    end: format(new Date(events.data[0].end), `yyyy-MM-dd'T'HH:mm:ss`),
                    status: events.data[0].status,
                    completed_at: format(new Date(events.data[0].completed_at), `yyyy-MM-dd'T'HH:mm:ss`),
                    temp: events.data[0].status
                })
            } else {
                this.setState({
                    id: e.id,
                    title: events.data[0].title,
                    description: events.data[0].description,
                    category: events.data[0].id_category,
                    location: events.data[0].location,
                    start: format(new Date(events.data[0].start), `yyyy-MM-dd'T'HH:mm:ss`),
                    end: format(new Date(events.data[0].end), `yyyy-MM-dd'T'HH:mm:ss`),
                    status: events.data[0].status,
                    completed_at: format(new Date(events.data[0].completed_at), `yyyy-MM-dd'T'HH:mm:ss`),
                    temp: 1
                })
            }
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
            <div className="animated fadeIn">
                <Calendar
                    localizer={localizer}
                    events={this.state.events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    onSelectEvent={(e) => { this.APISearch(e) }}
                    longPressThreshold={10}
                    selectable={true}
                    onSelectSlot={(e) => {
                        authToken().rid === 0 ?
                            <>
                                {this.setState({ start: format(e.start, `yyyy-MM-dd'T'HH:mm:ss`), end: format(e.end, `yyyy-MM-dd'T'HH:mm:ss`), })}
                                {this.toggleSuccess()}
                            </>
                            :
                            <></>
                    }}
                    timeslots="4"
                />

                <FormInsert toggleSuccess={this.toggleSuccess} data={this.state} handleChange={this.handleChange} handleChangeEditor={this.handleChangeEditor} />
                <FormUpdateDelete toggleMore={this.toggleMore} data={this.state} handleChange={this.handleChange} handleChangeEditor={this.handleChangeEditor} />
            </div>
        );
    }
}

export default Calendars;