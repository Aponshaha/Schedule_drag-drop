import React, { Component } from 'react'
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';
import JqxScheduler, { ISchedulerProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxscheduler';
import '../styles/jqx.base.css';
import Schedule from './Schedule';
//import '../styles/jqx.energyblue.css';


export class Another_schedule extends Component {
    constructor(props) {
        super(props);
        const appointments = new Array();
        
        const appointment1 = {
            calendar: 'Room 1',
            description: 'George brings projector for presentations.',
            end: new Date(2019, 10, 16, 14, 0, 0),
            id: 'id1',
            location: '',
            start: new Date(2019, 10, 16, 15, 0, 0),
            subject: 'Quarterly Project Review Meeting'
        };
        const appointment2 = {
            calendar: 'Room 2',
            description: '',
            end: new Date(2019, 10, 16, 15, 0, 0),
            id: 'id2',
            location: '',
            start: new Date(2019, 10, 16, 10, 0, 0),
            subject: 'IT Group Mtg.'
        };
        
        
        appointments.push(appointment1);
        appointments.push(appointment2);
        
       

        

        const source = {
            dataFields: [
                { name: 'id', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'location', type: 'string' },
                { name: 'subject', type: 'string' },
                { name: 'calendar', type: 'string' },
                { name: 'start', type: 'date' },
                { name: 'end', type: 'date' }
            ],
            dataType: 'array',
            id: 'id',
            localData: appointments
        }
        const dataAdapter = new jqx.dataAdapter(source);
        this.state = {
            dataAll: [],
            appointmentDataFields: {
                description: 'description',
                from: 'start',
                id: 'id',
                location: 'location',
                resourceId: 'calendar',
                subject: 'subject',
                to: 'end'
            },
            date: new jqx.date('todayDate'),
            height: 600,
            ready: () => {
                setTimeout(() => {                    
                    //this.myScheduler.current.ensureAppointmentVisible('id1');
                });
            },
            resources: {
                colorScheme: 'scheme05',
                dataField: 'calendar',
                source: new jqx.dataAdapter(source)
            },
            source: dataAdapter,
            views: [
                'dayView',
                'weekView',
                'monthView'
            ]
        }
    
    
}

editDialogCreate = (dialog, fields, editAppointment) => {
    // hide repeat option
    //fields.repeatContainer.hide();
    // hide status option
    fields.statusContainer.hide();
    // hide timeZone option
    fields.timeZoneContainer.hide();
    // hide color option
    //fields.colorContainer.hide();

    fields.subjectLabel.html("Class Name");
    fields.locationLabel.html("Location");
    fields.fromLabel.html("Start");
    fields.toLabel.html("End");
    fields.resourceLabel.html("Calendar");
    
    

    
    }

componentDidMount(){
    
    //console.log(this.state.appointmentDataFields,'123456789');
    //this.myWindow.setContent('New Content');
}
changeHandler(){

   // console.log('234567890');

}

// setSchedule = (data) =>{
//     this.setState({schedule: []}, ()=>{
//         this.renderAppointment(data)
//     })
// }


renderAppointment = (data) =>{

    //console.log(data.appointment);
    //var date = new Date(data.appointment.from)
    // console.log('date ', date.toGMTString())
    // console.log('year ', date.getFullYear())

    //console.log(data.appointment.id,data.appointment.from.getDate(),data.appointment.to.toString(),data.appointment.subject);
    //console.log('data ', data)
    let schedule = this.state.dataAll

    let d = {
        id: data.appointment.id,
        name : data.appointment.subject,
        start: data.appointment.from.toString(),
        end : data.appointment.to.toString(),
        desc: data.appointment.description 
    }
    if(schedule.length == 0){
        console.log('hell yeah')
        schedule.push(d)
        this.setState({dataAll:schedule},()=>{console.log('data ', this.state.dataAll)})
    }else{
        let push = true
        
        schedule.forEach(singleSchedule=>{
            (console.log('schedule ', singleSchedule.id))
            console.log('data ', d.id)
            if(singleSchedule.id == d.id){
                push = false
            }
        })
        console.log(push)
        if(push){
            schedule.push(d)
            }
    this.setState({dataAll:schedule},()=>{console.log('state data ', this.state.dataAll)})
    }
    
}
jsonExportClick = () => {
    console.log(this.state.dataAll)
}

render(){
    //console.log(this.state.dataAll)
    return(
        <div>
        <JqxScheduler ref={this.myScheduler}
        // @ts-ignore
        width={this.state.width}
        height={this.state.height}
        date={this.state.date}
        source={this.state.source}
        showLegend={true}
        view={"weekView"}
        appointmentDataFields={this.state.appointmentDataFields}
        resources={this.state.resources}
        resizable={"resizable"}
        showLegend={true}
        appointmentOpacity={0.7}
        views={this.state.views}
        ready={this.state.ready}

        //dialog function 
        editDialogCreate = {this.editDialogCreate}
       // changeHandler = {this.changeHandler}
        renderAppointment = {this.renderAppointment}
        />

        
            <div style={{ marginLeft: 10, float: "left" }}>
                        <JqxButton onClick={this.jsonExportClick} width={120}>
                            Export Data
                        </JqxButton>
            </div >
        </div>
    
        );
    }
}
