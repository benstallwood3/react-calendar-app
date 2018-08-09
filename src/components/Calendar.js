import React from "react";
import Day from "./Day";
import AddEvent from "./AddEvent";
import "../App.css";
import base from "../base";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const date = new Date();
const weekday = date.getDay();
let month = date.getMonth();
const day = date.getDate();
let year = date.getFullYear();

const today = days[weekday] + " " + day + " " + months[month];

class Calendar extends React.Component {
  state = {
    today: today,
    highlightedDay: null,
    currentMonth: month,
    currentYear: year,
    realTimeMonth: month,
    addEventClicked: false,
    events: {},
    hasEvent: false
  };

  componentDidMount() {
    this.setState({
      currentMonth: month,
      currentYear: year,
      today: today
    });

    this.ref = base.syncState("/", {
      context: this,
      state: "events"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  handleClick = event => {
    const day = event.target.dataset.day;
    const month = months[this.state.currentMonth];
    const year = this.state.currentYear;
    if (day + " " + month + " " + year === this.state.highlightedDay) {
      console.log("double clicked");
    }

    this.setState({
      highlightedDay: day + " " + month + " " + year
    });
  };

  getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  nextMonth = () => {
    let currentMonth = this.state.currentMonth;
    let currentYear = this.state.currentYear;

    currentMonth++;
    if (currentMonth === 12) {
      currentMonth = 0;
      currentYear++;
    }

    this.setState({
      currentMonth: currentMonth,
      currentYear: currentYear
    });
  };

  prevMonth = () => {
    let currentMonth = this.state.currentMonth;
    let currentYear = this.state.currentYear;

    currentMonth--;
    if (currentMonth === -1) {
      currentMonth = 11;
      currentYear--;
    }

    this.setState({
      currentMonth: currentMonth,
      currentYear: currentYear
    });
  };

  whatIsDay = key => {
    return (
      key +
      1 +
      " " +
      months[this.state.currentMonth] +
      " " +
      this.state.currentYear
    );
  };

  createGrid = (month, year) => {
    const daysInMonth = [];
    for (let i = 0; i < this.getDaysInMonth(month, year); i++) {
      daysInMonth.push(i);
    }
    return daysInMonth.map(key => (
      <Day
        key={key}
        index={key}
        today={day}
        month={months[this.state.currentMonth]}
        currentDay={
          this.state.currentMonth === this.state.realTimeMonth &&
          day === key + 1
        }
        highlighted={this.state.highlightedDay === this.whatIsDay(key)}
        eventToday={this.whatIsDay(key)}
        currentYear={this.state.currentYear}
        handleClick={this.handleClick}
        addEvent={this.addEvent}
        events={Object.values(this.state.events).filter(
          event => event.day === this.whatIsDay(key)
        )}
      />
    ));
  };

  createGhostCell = () => {
    const ghostCell = [];
    const firstDay = new Date();
    firstDay.setDate(1);
    firstDay.setMonth(this.state.currentMonth);
    firstDay.setFullYear(this.state.currentYear);
    const ghostCellAmount = firstDay.getDay();
    for (let y = 0; y < ghostCellAmount; y++) {
      ghostCell.push(y);
    }
    return ghostCell.map(ghost => <div key={ghost} className="ghost-cell" />);
  };

  addEventToState = createdEvent => {
    const events = { ...this.state.events };
    events[`event - ${Date.now()}`] = createdEvent;
    this.setState({
      events: events
    });
  };

  onEventAdded = e => {
    this.setState({
      addEventClicked: false
    });
  };

  addEvent = e => {
    e.stopPropagation();
    this.setState({
      addEventClicked: true
    });
  };

  exit = () => {
    this.setState({
      addEventClicked: false
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.addEventClicked ? (
          <AddEvent
            onEventAdded={this.onEventAdded}
            exit={this.exit}
            day={this.state.highlightedDay}
            addEventToState={this.addEventToState}
          />
        ) : null}
        <h2>
          {months[this.state.currentMonth] + " " + this.state.currentYear}
        </h2>
        <div className="day-names">
          <div className="day-name">S</div>
          <div className="day-name">M</div>
          <div className="day-name">T</div>
          <div className="day-name">W</div>
          <div className="day-name">T</div>
          <div className="day-name">F</div>
          <div className="day-name">S</div>
        </div>
        <div className="Calendar">
          <button onClick={this.nextMonth} className="next-month">
            NEXT &gt;
          </button>
          <button onClick={this.prevMonth} className="prev-month">
            &lt; PREV
          </button>
          <div className="grid">
            {this.createGhostCell()}
            {this.createGrid(month, year)}
          </div>
        </div>
        <div className="footer" />
      </div>
    );
  }
}

export default Calendar;
