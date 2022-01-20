import React from "react";
import { connect } from "react-redux";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Event from "./Event";
import { formValues } from "redux-form";

class Calendar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { toggleAddEventModal: false, selectInfo: null };
	}

	render() {
		return (
			<div>
				<FullCalendar
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
					headerToolbar={{
						left: "prev,next today",
						center: "title",
						right: "dayGridMonth,timeGridWeek,timeGridDay",
					}}
					initialView="timeGridWeek"
					editable={true}
					selectable={true}
					selectMirror={true}
					dayMaxEvents={true}
					weekends={true}
					datesSet={this.handleDates}
					select={this.handleDateSelect}
					events={this.props.events}
					eventContent={renderEventContent} // custom render function
					eventClick={this.handleEventClick}
					eventAdd={this.handleEventAdd}
					eventChange={this.handleEventChange} // called for drag-n-drop/resize
					eventRemove={this.handleEventRemove}
				/>
        {this.state.toggleAddEventModal ? <Event onEventSubmit={this.onEventSubmit} toggle={this.onEventToggle} /> : null}
			</div>
		);
	}

	// Event toggle
	onEventToggle = () => {
		this.setState({ toggleAddEventModal: !this.state.toggleAddEventModal });
		this.setState({ selectInfo: null });
	}
	
	onEventSubmit = (formValues) => {
		let calendarApi = this.state.selectInfo.view.calendar;
		const {name, description} = formValues;
		calendarApi.addEvent(
			{
				// will render immediately. will call handleEventAdd
				title: name,
				description,
				start: this.state.selectInfo.startStr,
				end: this.state.selectInfo.endStr,
				allDay: this.state.selectInfo.allDay,
			},
			true
		); // temporary=true, will get overwritten when reducer gives new events
		calendarApi.unselect();
		this.setState({ toggleAddEventModal: !this.state.toggleAddEventModal });
		this.setState({ selectInfo: null });
	};

	// handlers for user actions
	// ------------------------------------------------------------------------------------------

	handleDateSelect = (selectInfo) => {
		this.setState({toggleAddEventModal: !this.state.toggleAddEventModal});
		this.setState({ selectInfo: selectInfo });
	};

	handleEventClick = (clickInfo) => {
		// do a ShowEvent Modal for this
		this.setState({ toggleAddEventModal: !this.state.toggleAddEventModal });
	};

	// handlers that initiate reads/writes via the 'action' props
	// ------------------------------------------------------------------------------------------

	handleDates = (rangeInfo) => {};

	handleEventAdd = (addInfo) => {};

	handleEventChange = (changeInfo) => {};

	handleEventRemove = (removeInfo) => {};
}

function renderEventContent(eventInfo) {
	return (
		<>
			<b>{eventInfo.timeText}</b>
			<i>{eventInfo.event.title}</i>
			<br />
			<i>{eventInfo.event.extendedProps.description}</i>
		</>
	);
}

const mapStateToProps = () => {};

export default connect(mapStateToProps, null)(Calendar);
