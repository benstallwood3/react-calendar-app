import React from "react";
import Event from "./Event";

class Day extends React.Component {
  state = {
    hasEvent: false,
    events: []
  };

  componentDidMount() {
    setTimeout(() => {
      this.checkEvent(); // DATA WOULD get imported after function call, therefore needed to wait before calling it.
    }, 3000);
  }

  // Latest functionality (where my head was going to explode) getEvent and checkEvent

  checkEvent = () => {
    const day =
      this.props.index +
      1 +
      " " +
      this.props.month +
      " " +
      this.props.currentYear;
    const obj = this.props.events;
    Object.keys(obj).forEach(key => {
      return obj[key].day === day
        ? this.setState({
            hasEvent: true,
            event: this.state.events.push(key)
          })
        : null;
    });
  };

  getEvent = () => {
    for (let i = 0; i < this.state.events.length; i++) {
      let event = this.props.events[this.state.events[i]];
      return event.start + " - " + event.end + " " + event.name;
    }
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
        {this.state.hasEvent ? <Event event={this.getEvent()} /> : null}
        <div className="plus" onClick={this.props.addEvent}>
          +
        </div>
      </div>
    );
  }
}

export default Day;
