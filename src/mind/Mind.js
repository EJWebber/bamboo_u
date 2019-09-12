import React from "react";
import DMGoalContainer from "./daily/DMGoalContainer";
import WMGoalContainer from "./weekly/WMGoalContainer";
import MindHistory from "./history/MindHistory";
// import { Transition, Button } from "semantic-ui-react";

class Mind extends React.Component {
  state = { showHistory: false };

  toggleShowHistory = () => {
    this.setState({ showHistory: !this.state.showHistory });
  };

  render() {
    return (
      <div className="mind">
        <DMGoalContainer
          user={this.props.user}
          updateDMGoal={this.props.updateDMGoal}
          WMGs={this.props.WMGs}
          removeDMG={this.props.removeDMG}
        />
        <WMGoalContainer
          WMGs={this.props.WMGs}
          user={this.props.user}
          addWMGoal={this.props.addWMGoal}
          addDMGoal={this.props.addDMGoal}
          updateWMGoal={this.props.updateWMGoal}
          removeWMG={this.props.removeWMG}
        />
        <br />
        <br />

        <MindHistory user={this.props.user} WMGs={this.props.WMGs} />
      </div>
    );
  }
}
export default Mind;
