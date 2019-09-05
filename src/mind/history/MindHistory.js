import React from "react";
import DMGoal from "../daily/DMGoal";
const moment = require("moment");

class MindHistory extends React.Component {
  completedUDMGs = () => {
    return this.props.user.user_dm_goals.filter(uwmg => uwmg.complete === true);
  };
  updateDMGoal = () => {
    console.log("Crisis Averted");
  };

  render() {
    return (
      <div className="history">
        <h2>History</h2>
        {/* {console.log(this.completedUDMGs())} */}
        {this.completedUDMGs()
          .reverse()
          .map(goal => (
            <div>
              {moment(goal.updated_at).format("ddd Do MMM")}
              -
              <DMGoal
                dmg={goal}
                WMGs={this.props.WMGs}
                user={this.props.user}
                updateDMGoal={this.updateDMGoal}
              />
            </div>
          ))}
        {/* {this.props.user.user_wm_goals.map(uwmg => this.props.WMGs.filter(wmg => wmg.id === uwmg.wm_goal_id).activity)} */}
      </div>
    );
  }
}
export default MindHistory;
