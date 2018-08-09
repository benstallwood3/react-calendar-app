import React from "react";
import Event from "./Event";

class Day extends React.Component {
  checkEvent = () => {
    return this.props.events.map(event => (
      <Event event={event.start + " - " + event.end + " " + event.name} />
    ));
  };

  render() {
    return (
      <div
        className={
          "grid-cell" +
          (this.props.currentDay ? " current-day" : "") +
          (this.props.highlighted ? " highlight-day" : "")
        }
        data-day={this.props.index + 1}
        onClick={this.props.handleClick}
      >
        <div className="cell-date">{this.props.index + 1}</div>
        {this.checkEvent()}
        <div className="plus" onClick={this.props.addEvent}>
          +
        </div>
      </div>
    );
  }
}

export default Day;
