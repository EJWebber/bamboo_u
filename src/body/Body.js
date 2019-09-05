import React from "react";
import DBGoalContainer from "./daily/DBGoalContainer";
import WBGoalContainer from "./weekly/WBGoalContainer";
import BodyHistory from "./history/BodyHistory";
class Body extends React.Component {
  render() {
    return (
      <div>
        <DBGoalContainer
          user={this.props.user}
          updateDBGoal={this.props.updateDBGoal}
          WBGs={this.props.WBGs}
        />
        <WBGoalContainer
          WBGs={this.props.WBGs}
          user={this.props.user}
          addWBGoal={this.props.addWBGoal}
          addDBGoal={this.props.addDBGoal}
          updateWBGoal={this.props.updateWBGoal}
        />
        <BodyHistory user={this.props.user} WBGs={this.props.WBGs} />
      </div>
    );
  }
}
export default Body;
