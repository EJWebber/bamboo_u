import React from "react";
import { Button, Progress, Label, Grid } from "semantic-ui-react";
import API from "../../adapters/API";
const moment = require("moment");

class WMGoal extends React.Component {
  state = {
    userWMG: {},
    updated: false
  };

  componentDidMount() {
    this.fetchUserWMG();
  }

  fetchUserWMG = () => {
    API.fetchUserWMG(this.props.goal.id).then(resp =>
      this.setState({ userWMG: resp })
    );
  };

  handleClick = () => {
    const dailyGoal = { user_wm_goal_id: this.props.goal.id, complete: false };
    API.postUserDMG(dailyGoal).then(this.props.addDMGoal);
  };

  completedDGs = () => {
    const userDMGs = this.props.user.user_dm_goals.filter(
      udmg => udmg.user_wm_goal_id === this.state.userWMG.id
    );
    return userDMGs.filter(udmg => udmg.complete === true);
  };

  componentDidUpdate() {
    this.checkComplete();
  }

  checkComplete = () => {
    if (
      this.completedDGs().length === this.props.goal.number &&
      !this.state.updated
    ) {
      API.updateUserWMG(this.props.goal).then(this.props.updateWMGoal);
      this.setState({ updated: true });
    }
  };

  dmTimeFilter = () => {
    const a = moment();
    return this.props.user.user_dm_goals.filter(goal =>
      a.isSame(moment(goal.created_at), "day")
    );
  };

  deleteGoal = goal => {
    API.deleteUserWMG(goal);
    this.props.removeWMG(goal);
  };

  render() {
    const filteredWMGs = this.props.WMGs.filter(
      wmg => wmg.id === this.props.goal.wm_goal_id
    )[0];
    // const timeFiltered = filteredWMGs.filter(goal => )
    return (
      <Grid.Row className="weeklyGoal">
        <Grid.Column>
          {this.completedDGs().length >= this.props.goal.number ? (
            <Button color="green" size="mini">
              Completed
            </Button>
          ) : this.dmTimeFilter().length < 3 ? (
            <Button size="mini" onClick={this.handleClick} color="yellow">
              Daily Goal +
            </Button>
          ) : (
            <Button size="mini" color="yellow">
              3/3 Daily Goals
            </Button>
          )
          // {this.completedDGs().length}/{this.props.goal.number}
          }
        </Grid.Column>
        <Grid.Column className="progressAct">
          {filteredWMGs.activity} {this.props.goal.number} times
        </Grid.Column>
        <Grid.Column>
          <Progress
            // percent={
            //   (this.completedDGs().length / this.props.goal.number) * 100
            // }
            indicating
            value={this.completedDGs().length}
            total={this.props.goal.number}
            progress="ratio"
          />{" "}
          <Label
            size="mini"
            color="red"
            floating
            onClick={() => this.deleteGoal(this.props.goal)}
          >
            x
          </Label>
        </Grid.Column>
      </Grid.Row>
    );
  }
}
export default WMGoal;
