import React from "react";
import { Button } from "semantic-ui-react";
import WBGoalForm from "../components/WBGoalForm";
import WBGoal from "./WBGoal";
const moment = require("moment");

class WBGoalContainer extends React.Component {
  state = {
    formToggle: false
  };

  WBList(timeFiltered) {
    return (
      <>
        <Button onClick={this.showForm}>New Weekly Goal</Button>
        <br />
        <br />
        {timeFiltered.map(goal => (
          <WBGoal
            goal={goal}
            WBGs={this.props.WBGs}
            user={this.props.user}
            key={goal.id}
            addDBGoal={this.props.addDBGoal}
            updateWBGoal={this.props.updateWBGoal}
          />
        ))}
      </>
    );
  }

  timeFilter = () => {
    const a = moment();

    return this.props.user.user_wb_goals.filter(goal =>
      // a.diff(new Date(goal.created_at), 'days') < 7
      a.isBefore(moment(goal.created_at).add(7, "days"))
    );
  };

  showForm = () => {
    this.setState({ formToggle: !this.state.formToggle });
  };

  render() {
    const timeFiltered = this.timeFilter();

    return (
      <div className="container">
        <h2>Weekly Goals</h2>
        {this.state.formToggle ? (
          <WBGoalForm
            user={this.props.user}
            WBGs={this.props.WBGs}
            addWBGoal={this.props.addWBGoal}
            showForm={this.showForm}
          />
        ) : (
          this.WBList(timeFiltered)
        )}
      </div>
    );
  }
}
export default WBGoalContainer;
