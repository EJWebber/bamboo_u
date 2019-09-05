import React from "react";
import DMGoal from "./DMGoal";
const moment = require("moment");

class DMGoalContainer extends React.Component {
  dmTimeFilter = () => {
    const a = moment();
    return this.props.user.user_dm_goals.filter(goal =>
      a.isSame(moment(goal.created_at), "day")
    );
  };

  render() {
    return (
      <div>
        <h2>Daily:</h2>
        {this.dmTimeFilter().map(dmg => (
          <DMGoal
            dmg={dmg}
            user={this.props.user}
            updateDMGoal={this.props.updateDMGoal}
            WMGs={this.props.WMGs}
          />
        ))}
      </div>
    );
  }
}
export default DMGoalContainer;
