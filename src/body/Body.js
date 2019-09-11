import React from "react";
import DBGoalContainer from "./daily/DBGoalContainer";
import WBGoalContainer from "./weekly/WBGoalContainer";
import BodyHistory from "./history/BodyHistory";
import { Header } from "semantic-ui-react";
class Body extends React.Component {
  render() {
    return (
      <div>
        <DBGoalContainer
          user={this.props.user}
          updateDBGoal={this.props.updateDBGoal}
          WBGs={this.props.WBGs}
          removeDBG={this.props.removeDBG}
        />

        <WBGoalContainer
          WBGs={this.props.WBGs}
          user={this.props.user}
          addWBGoal={this.props.addWBGoal}
          addDBGoal={this.props.addDBGoal}
          updateWBGoal={this.props.updateWBGoal}
          removeWBG={this.props.removeWBG}
        />
        <br />
        <br />
        <BodyHistory user={this.props.user} WBGs={this.props.WBGs} />
      </div>
    );
  }
}
export default Body;
