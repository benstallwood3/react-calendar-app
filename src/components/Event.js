import React from "react";

class Event extends React.Component {
  render() {
    return <div className="event-teaser">{this.props.event}</div>;
  }
}

export default Event;
