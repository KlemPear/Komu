import React from "react";
import { connect } from "react-redux";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEvent from "./AddEvent";
import ShowEvent from "./ShowEvent";
import { createEvent } from "../../actions";

class Calendar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			toggleAddEventModal: false,
			toggleShowEventModal: false,
			selectInfo: null,
			eventToShow: null,
		};
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
				{this.state.toggleAddEventModal ? (
					<AddEvent
						onEventSubmit={this.onEventSubmit}
						toggle={this.onAddEventToggle}
					/>
				) : null}
				{this.state.toggleShowEventModal ? (
					<ShowEvent
						event={this.state.eventToShow}
						toggle={this.onShowEventToggle}
					/>
				) : null}
			</div>
		);
	}

	// Event toggle
	onShowEventToggle = () => {
		this.setState({ toggleShowEventModal: !this.state.toggleShowEventModal });
		this.setState({ eventToShow: null });
	};

	onAddEventToggle = () => {
		this.setState({ toggleAddEventModal: !this.state.toggleAddEventModal });
		this.setState({ selectInfo: null });
	};

	onEventSubmit = (formValues) => {
		let calendarApi = this.state.selectInfo.view.calendar;
		const { name, description, guests } = formValues;
		this.props.createEvent(formValues, this.props.selectedKomuId);
		calendarApi.addEvent(
			{
				// will render immediately. will call handleEventAdd
				title: name,
				description,
				guests,
				start: this.state.selectInfo.startStr,
				end: this.state.selectInfo.endStr,
				allDay: this.state.selectInfo.allDay,
			},
			true
		); // temporary=true, will get overwritten when reducer gives new events
		calendarApi.unselect();
		this.onAddEventToggle();
	};

	// handlers for user actions
	// ------------------------------------------------------------------------------------------

	handleDateSelect = (selectInfo) => {
		this.setState({ toggleAddEventModal: !this.state.toggleAddEventModal });
		this.setState({ selectInfo: selectInfo });
	};

	handleEventClick = (clickInfo) => {
		const { description, guests } = clickInfo.event.extendedProps;
		const { allDay, startStr, endStr, title } = clickInfo.event;
		const eventToShow = {
			allDay,
			startStr,
			endStr,
			title,
			description,
			guests,
		};
		this.setState({ eventToShow: eventToShow });
		this.setState({ toggleShowEventModal: !this.state.toggleShowEventModal });
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
			<b>{eventInfo.timeText}</b> -<i>{eventInfo.event.title}</i> <br />
			<b>Description: </b>
			<i>{eventInfo.event.extendedProps.description}</i>
			<br />
			<b>Guests: </b>
			<i>{eventInfo.event.extendedProps.guests}</i>
			<br />
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		selectedKomuId: state.misc.selectedKomuId,
	};
};

export default connect(mapStateToProps, { createEvent })(Calendar);
