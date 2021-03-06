import React from "react";
// import CreateDBGoal from "./CreateDBGoal"
import { Button, Progress, Label, Grid } from "semantic-ui-react";
import API from "../../adapters/API";
const moment = require("moment");

class WBGoal extends React.Component {
  state = {
    userWBG: {},
    updated: false
  };

  componentDidMount() {
    this.fetchUserWBG();
  }

  fetchUserWBG = () => {
    API.fetchUserWBG(this.props.goal.id).then(resp =>
      this.setState({ userWBG: resp })
    );
  };

  handleClick = () => {
    const dailyGoal = {
      user_wb_goal_id: this.props.goal.id,
      complete: false,
      time: 0
    };
    API.postUserDBG(dailyGoal).then(this.props.addDBGoal);
  };

  completedDGs = () => {
    const userDBGs = this.props.user.user_db_goals.filter(
      udbg => udbg.user_wb_goal_id === this.state.userWBG.id
    );
    const completed = userDBGs.filter(udbg => udbg.complete === true);
    const completedTimes = completed.map(goal => goal.time);
    return completedTimes.reduce((a, b) => a + b, 0);
  };

  componentDidUpdate() {
    this.checkComplete();
  }

  checkComplete = () => {
    if (
      this.completedDGs().length === this.props.goal.number &&
      !this.state.updated
    ) {
      API.updateUserWBG(this.props.goal).then(this.props.updateWBGoal);
      this.setState({ updated: true });
    }
  };

  dbTimeFilter = () => {
    const a = moment();
    return this.props.user.user_db_goals.filter(goal =>
      a.isSame(moment(goal.created_at), "day")
    );
  };

  deleteGoal = goal => {
    API.deleteUserWBG(goal);
    this.props.removeWBG(goal);
  };

  render() {
    const filteredWBGs = this.props.WBGs.filter(
      wbg => wbg.id === this.props.goal.wb_goal_id
    )[0];

    // {this.completedDGs()}/{this.props.goal.time}
    return (
      <Grid.Row className="weeklyGoal">
        <Grid.Column>
          {this.completedDGs() >= this.props.goal.time ? (
            <Button size="mini" color="green">
              Completed
            </Button>
          ) : this.dbTimeFilter().length < 3 ? (
            <Button size="mini" onClick={this.handleClick} color="yellow">
              Daily Goal +
            </Button>
          ) : (
            <Button size="mini" color="yellow">
              3/3 Daily Goals
            </Button>
          )}
        </Grid.Column>
        {/* BREAK HERE */}

        <Grid.Column className="progressAct">
          {filteredWBGs.activity} for {this.props.goal.time} minutes total
        </Grid.Column>
        <Grid.Column>
          <Progress
            indicating
            value={this.completedDGs()}
            total={this.props.goal.time}
            progress="ratio"
          />
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
export default WBGoal;
