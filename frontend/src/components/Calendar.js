import React from "react";
import { connect } from "react-redux";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


class Calendar extends React.Component {

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
			</div>
		);
  }

  // handlers for user actions
  // ------------------------------------------------------------------------------------------

  handleDateSelect = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar
    let title = prompt('Please enter a new title for your event')

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({ // will render immediately. will call handleEventAdd
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      }, true) // temporary=true, will get overwritten when reducer gives new events
    }
  }

  handleEventClick = (clickInfo) => {
    
  }

  // handlers that initiate reads/writes via the 'action' props
  // ------------------------------------------------------------------------------------------

  handleDates = (rangeInfo) => {
    
  }

  handleEventAdd = (addInfo) => {
    
  }

  handleEventChange = (changeInfo) => {
    
  }

  handleEventRemove = (removeInfo) => {
    
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}



const mapStateToProps = () => {

}

export default connect(mapStateToProps, null)(Calendar);
