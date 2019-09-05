import React from "react";
// import CreateDBGoal from "./CreateDBGoal"
import { Button, Grid, Label } from "semantic-ui-react";
import API from "../../adapters/API";

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

  render() {
    const filteredWBGs = this.props.WBGs.filter(
      wbg => wbg.id === this.props.goal.wb_goal_id
    )[0];
    // const timeFiltered = filteredWMGs.filter(goal => )
    return (
      <div>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
              {filteredWBGs.activity} for {this.props.goal.time} minutes this
              week
            </Grid.Column>
            <Grid.Column>
              {this.completedDGs() >= this.props.goal.time ? (
                <Label color="green">
                  {this.completedDGs()}/{this.props.goal.time}
                </Label>
              ) : (
                <Label color="yellow">
                  <Button compact onClick={this.handleClick}>
                    Daily +
                  </Button>
                  {this.completedDGs()}/{this.props.goal.time}
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
export default WBGoal;
