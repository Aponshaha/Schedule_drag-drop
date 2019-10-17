import React, { Component } from 'react'
import { Col, Row } from "reactstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";



export class Schedule_new extends Component {
    state = {
        calendarEvents: [
            {
                title: "Atlanta Monster",
                start: new Date("2019-10-04 09:00"),
                id: "98",
                sensei: "saka"
            }
        ],
        events: [
            { title: "Class 1", id: "1", sensei: "saka" },
            { title: "Class 2", id: "2", sensei: "nakamura" },
            { title: "Class 3", id: "3", sensei: "saka" },
            { title: "Class 4", id: "4", sensei: "ishijaka" },
            { title: "Class 5", id: "5", sensei: "saka" },
            { title: "Class 6", id: "6", sensei: "Arai" }
        ]
    };


    componentDidMount() {
        let draggableEl = document.getElementById("external-events");
        new Draggable(draggableEl, {
          itemSelector: ".fc-event",
          eventData: function(eventEl) {
            let title = eventEl.getAttribute("title");
            let id = eventEl.getAttribute("id");
            let sensei = eventEl.getAttribute("data");
            return {
              title,id, sensei,
            };
          }
        });

        
    }

    eventClick = eventClick => {

        //this.setState({id:eventClick.event.start,start:eventClick.event.id,sensei:eventClick.event.sensei})
        //this.setState({id:eventClick.event.id})
        Alert.fire({
            title: eventClick.event.title,
            html:
                `<div class="table-responsive">
          <table class="table">
          <tbody>
          <tr >
          <td>Sensei</td>
          <td><strong>` +
                eventClick.event.id +
                //eventClick.event.sensei +

                `</strong></td>
          </tr>
          <tr >
          <td>Start Time</td>
          <td><strong>
          ` +
                eventClick.event.start +
                `
          </strong></td>
          </tr>
    
          <tr >
          <td>End Time</td>
          <td><strong>
          ` +
                eventClick.event.end +
                `
          </strong></td>
          </tr>
          </tbody>
          </table>
          </div>`,

            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Remove Event",
            cancelButtonText: "Close"
        }).then(result => {
            if (result.value) {
                eventClick.event.remove(); // It will remove event from the calendar
                Alert.fire("Deleted!", "Your Event has been deleted.", "success");
            }
        });
    };

    render() {
        return (
            <div className="animated fadeIn p-4 demo-app">



                <Row>
                    <Col lg={3} sm={3} md={3}>
                        <div
                            id="external-events"
                            style={{
                                padding: "10px",
                                width: "80%",
                                height: "auto",
                                maxHeight: "-webkit-fill-available"
                            }}
                        >
                            <p align="center">
                                <strong> Classes</strong>
                            </p>
                            {this.state.events.map(event => (
                                <div
                                    className="fc-event"
                                    title={event.title}
                                    sensei={event.sensei}
                                    //sensei={event.sensei}
                                    id={event.id}
                                    key={event.id}
                                >

                                    {event.title}
                                    <br />
                                    {event.sensei}
                                    
                                </div>

                            ))}

                        </div>
                    </Col>
                    <Col lg={9} sm={9} md={9}>
                        <div>
                            <button type="submit" onClick="handleChange()">save</button>
                        </div>
                        <div className="demo-app-calendar" id="mycalendartest">

                            <FullCalendar
                                defaultView="timeGridWeek"
                                header={{
                                    left: "prev,next today",
                                    center: "title",
                                    right: "dayGridMonth,timeGridWeek,listWeek"
                                }}
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                eventDurationEditable={false}
                                editable={true}
                                droppable={true}
                                businessHours={true}
                                slotDuration={'00:10'}
                                // events={[
                                //     {title: 'class 1',sensei:'Saka',date:'2019-10-01'},
                                //     {title: 'class 2',sensei:'Nakamura',date:'2019-10-02'}
                                //     ]}
                                events={this.state.calendarEvents}
                                classes={this.state.events}
                                //calendarEvents={this.state.events}
                                eventDrop={this.drop}
                                // drop={this.drop}
                                eventReceive={this.eventReceive}
                                eventClick={this.eventClick}

                            />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Schedule_new
 //
