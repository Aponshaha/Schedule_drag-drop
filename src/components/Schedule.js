import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import FullCalendar from  "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

export default class Schedule extends React.Component {
  state = {
    calendarEvents: [
      {
        title: "Atlanta Monster",
        start: new Date("2019-10-04 09:00"),
        id: "99999998"
      },
      {
        title: "My Favorite Murder",
        start: new Date("2019-10-05 00:00"),
        id: "99999999"
      }
    ],
    events: [
      { title: "Class 1", id: "1", sensei: "saka" },
      { title: "Class 2", id: "2", sensei: "nakamura"},
      { title: "Class 3", id: "3", sensei: "saka"  },
      { title: "Class 4", id: "4" , sensei: "ishijaka" },
      { title: "Class 5", id: "5" , sensei: "saka" },
      { title: "Class 6", id: "6", sensei: "Arai" }
    ]
  };



  /**
   * adding dragable properties to external events through javascript
   */
  componentDidMount() {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function(eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("teacher");
        let teacher = eventEl.getAttribute("data");
        return {
          title: title,
          id: id,
          teacher: teacher ,
        };
      }
    });
    
  }
  

  /**
   * when we click on event we are displaying event details
   */
  
  eventClick = eventClick => {
    
    this.setState({id:eventClick.event.id,start:eventClick.event.start})
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
        //eventClick.event.teacher +
        
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

  handleChange = (eventClick) =>{
    console.log(1,2,3)
  }

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
                  data={event.sensei}
                  teacher={event.sensei}
                  key={event.id}
                >
                  
                  {event.title}
                  <br/>
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
                  center: "",
                  right: "dayGridMonth,timeGridWeek,listWeek"

                }}
                
                businessHours={true}
                slotDuration= {'00:10'}
                weekends={true}
                rerenderDelay={10}
                eventDurationEditable={true}
                editable={true}
                droppable={true}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                ref={this.calendarComponentRef}
                weekends={this.state.calendarWeekends}
                events={this.state.calendarEvents}
                eventDrop={this.drop}
                // drop={this.drop}
                eventReceive={this.eventReceive}
                eventClick={this.eventClick}
                
                // selectable={true}
              />
            </div>
          </Col>
        </Row>
        
      </div>
    );
  }
}