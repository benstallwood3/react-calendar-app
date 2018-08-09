import React from "react";

class AddEvent extends React.Component {
  constructor(props) {
    super(props);
    this.nameRef = React.createRef();
    this.locationRef = React.createRef();
    this.descRef = React.createRef();
    this.startTimeRef = React.createRef();
    this.endTimeRef = React.createRef();
  }

  createEvent = e => {
    e.preventDefault();
    const createdEvent = {
      name: this.nameRef.current.value,
      location: this.locationRef.current.value,
      desc: this.descRef.current.value,
      start: this.startTimeRef.current.value,
      end: this.endTimeRef.current.value,
      day: this.props.day
      // ADD DAY TO THIS
    };

    this.props.addEventToState(createdEvent);
    this.props.onEventAdded();
    e.currentTarget.reset();
  };

  render() {
    return (
      <div className="add-event-modal">
        <div className="form-wrapper">
          <form className="form" onSubmit={this.createEvent}>
            <h2>Add Event - {this.props.day}</h2>
            <input
              type="text"
              name="event"
              placeholder="Event Name"
              ref={this.nameRef}
              required
            />
            <input
              type="text"
              name="event-location"
              placeholder="Event Location"
              ref={this.locationRef}
              required
            />
            <textarea
              type="text"
              name="desc"
              placeholder="Event Description"
              ref={this.descRef}
            />
            <div className="form-time">
              <label htmlFor="from">Event Start:</label>
              <input
                type="time"
                name="from"
                min="8:00"
                max="20:00"
                required
                ref={this.startTimeRef}
              />
            </div>
            <div className="form-time">
              <label htmlFor="until">Event End:</label>
              <input
                type="time"
                name="until"
                min="8:00"
                max="20:00"
                required
                ref={this.endTimeRef}
              />
            </div>
            <input type="submit" name="submit-event" />
          </form>
          <div className="exit" onClick={this.props.exit}>
            <i className="fas fa-times" />
          </div>
        </div>
      </div>
    );
  }
}

export default AddEvent;
