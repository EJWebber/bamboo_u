import React from "react";
import { Button, Grid, Label } from "semantic-ui-react";
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

  render() {
    const filteredWMGs = this.props.WMGs.filter(
      wmg => wmg.id === this.props.goal.wm_goal_id
    )[0];
    // const timeFiltered = filteredWMGs.filter(goal => )
    return (
      <div>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
              {filteredWMGs.activity} {this.props.goal.number} times this week
            </Grid.Column>
            <Grid.Column>
              {this.completedDGs().length >= this.props.goal.number ? (
                <Label color="green">
                  {this.completedDGs().length}/{this.props.goal.number}
                </Label>
              ) : (
                <Label color="yellow">
                  {this.dmTimeFilter().length < 3 ? (
                    <Button size="mini" onClick={this.handleClick}>
                      Daily +
                    </Button>
                  ) : null}
                  {this.completedDGs().length}/{this.props.goal.number}
                </Label>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br />
      </div>
    );
  }
}
export default WMGoal;
