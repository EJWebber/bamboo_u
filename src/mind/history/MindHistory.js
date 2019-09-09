import React from "react";
import DMGoal from "../daily/DMGoal";
const moment = require("moment");

class MindHistory extends React.Component {
  completedUDMGs = () => {
    return this.props.user.user_dm_goals.filter(udmg => udmg.complete === true);
  };
  completedUWMGs = () => {
    return this.props.user.user_wm_goals.filter(uwmg => uwmg.complete === true);
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
        {this.completedUWMGs()
          // .reverse()
          .map(goal => (
            <div>
              {moment(goal.updated_at).format("ddd Do MMM")} -
              {
                this.props.WMGs.filter(wmg => wmg.id === goal.wm_goal_id)[0]
                  .activity
              }
            </div>
          ))}
      </div>
    );
  }
}
export default MindHistory;
