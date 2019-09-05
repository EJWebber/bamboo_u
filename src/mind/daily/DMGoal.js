import React from "react";
import { Button, Label } from "semantic-ui-react";
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

  render() {
    return (
      <div>
        {this.props.dmg.complete ? (
          <Label className="goals">
            <Button size="mini" circular icon="check" color="green" />
            {this.filterForWMG().activity}
          </Label>
        ) : (
          <Label className="goals">
            <Button
              size="mini"
              circular
              icon="check"
              color="yellow"
              onClick={this.handleClick}
            />
            {this.filterForWMG().activity}
          </Label>
        )}
        <br />
        <br />
      </div>
    );
  }
}

export default DMGoal;
