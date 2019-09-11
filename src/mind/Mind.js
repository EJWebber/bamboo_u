import React from "react";
import DMGoalContainer from "./daily/DMGoalContainer";
import WMGoalContainer from "./weekly/WMGoalContainer";
import MindHistory from "./history/MindHistory";
import { Transition, Button } from "semantic-ui-react";

class Mind extends React.Component {
  render() {
    return (
      <div>
        <DMGoalContainer
          user={this.props.user}
          updateDMGoal={this.props.updateDMGoal}
          WMGs={this.props.WMGs}
        />
        <WMGoalContainer
          WMGs={this.props.WMGs}
          user={this.props.user}
          addWMGoal={this.props.addWMGoal}
          addDMGoal={this.props.addDMGoal}
          updateWMGoal={this.props.updateWMGoal}
        />

        <MindHistory user={this.props.user} WMGs={this.props.WMGs} />
      </div>
    );
  }
}
export default Mind;
