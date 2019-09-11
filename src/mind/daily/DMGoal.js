import React from "react";
import { Button } from "semantic-ui-react";
import API from "../../adapters/API";

class DMGoal extends React.Component {
  filterForUWMG = () => {
    return this.props.user.user_wm_goals.filter(
      uwmgoal => uwmgoal.id === this.props.dmg.user_wm_goal_id
    )[0];
  };

  filterForWMG = () => {
    return this.props.WMGs.filter(
      wmgoal => wmgoal.id === this.filterForUWMG().wm_goal_id
    )[0];
  };

  handleClick = () => {
    API.updateUserDMG(this.props.dmg).then(this.props.updateDMGoal);
    //
  };

  deleteGoal = goal => {
    API.deleteUserDMG(goal);
    this.props.removeDMG(goal);
  };

  render() {
    return (
      <div>
        {this.props.dmg.complete ? (
          <div>
            <Button size="mini" circular icon="check" color="green" />
            {this.filterForWMG().activity}
          </div>
        ) : (
          <div>
            <Button
              size="mini"
              circular
              icon="check"
              color="yellow"
              onClick={this.handleClick}
            />
            {this.filterForWMG().activity}
          </div>
        )}
        <Button
          size="mini"
          circular
          icon="close"
          color="red"
          onClick={() => this.deleteGoal(this.props.dmg)}
        />
      </div>
    );
  }
}

export default DMGoal;
