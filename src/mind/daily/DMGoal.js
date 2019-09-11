import React from "react";
import { Button, Label, Grid } from "semantic-ui-react";
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
      <Grid.Row>
        {this.props.dmg.complete ? (
          <>
            <Grid.Column>
              <Button size="mini" color="green">
                Completed
              </Button>
            </Grid.Column>
            <Grid.Column className="dailyAct">
              {this.filterForWMG().activity}
            </Grid.Column>
          </>
        ) : (
          <>
            <Grid.Column>
              <Button size="mini" color="yellow" onClick={this.handleClick}>
                Completed?
              </Button>
            </Grid.Column>
            <Grid.Column className="dailyAct">
              {this.filterForWMG().activity}
            </Grid.Column>
          </>
        )}
        <Grid.Column className="dailyCross">
          <Label
            size="mini"
            color="red"
            floating
            onClick={() => this.deleteGoal(this.props.dmg)}
          >
            x
          </Label>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default DMGoal;
