import React from "react";
import Graph from "./Graph";
import { Segment } from "semantic-ui-react";
const moment = require("moment");
class Home extends React.Component {
  completedUDMGs = () => {
    return this.props.user.user_dm_goals.filter(udmg => udmg.complete === true);
  };
  completedUDBGs = () => {
    return this.props.user.user_db_goals.filter(udbg => udbg.complete === true);
  };

  timeFilteredGoals = goals => {
    const a = moment();
    return goals.filter(goal =>
      // a.diff(new Date(goal.created_at), 'days') < 7
      a.isBefore(moment(goal.created_at).add(7, "days"))
    );
  };

  render() {
    const UDMGs = this.completedUDMGs();
    const UDBGs = this.completedUDBGs();
    return (
      <div className="test">
        {this.timeFilteredGoals(UDBGs).length < 3 &&
        this.timeFilteredGoals(UDMGs).length < 3 ? (
          <Segment raised className="graphDesc">
            Complete your goals to grow your bamboo. Try to complete Body and
            Mind goals to keep the heights of your bamboo the same.{" "}
          </Segment>
        ) : null}

        <div className="graph-1">
          <Graph dailyGoals={this.timeFilteredGoals(UDBGs)} />
          <div className="root-1">
            <br />
            Body
          </div>
        </div>
        <div className="graph-2">
          <Graph dailyGoals={this.timeFilteredGoals(UDMGs)} />
          <div className="root-2">
            <br />
            Mind
          </div>
        </div>
        <div className="ground" />
      </div>
    );
  }
}
export default Home;
