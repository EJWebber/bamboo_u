import React from "react";
import DBGoal from "./DBGoal";
const moment = require("moment");

class DBGoalContainer extends React.Component {
  dbTimeFilter = () => {
    const a = moment();
    return this.props.user.user_db_goals.filter(goal =>
      a.isSame(moment(goal.created_at), "day")
    );
  };

  render() {
    return (
      <div>
        <h2>Daily:</h2>
        {this.dbTimeFilter().map(dbg => (
          <DBGoal
            dbg={dbg}
            user={this.props.user}
            updateDBGoal={this.props.updateDBGoal}
            WBGs={this.props.WBGs}
          />
        ))}
      </div>
    );
  }
}
export default DBGoalContainer;
