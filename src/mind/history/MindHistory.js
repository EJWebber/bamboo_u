import React from "react";
// import DMGoal from "../daily/DMGoal";
import { Grid, Button, Icon } from "semantic-ui-react";
const moment = require("moment");

class MindHistory extends React.Component {
  state = { historyToggle: true };

  completedUDMGs = () => {
    return this.props.user.user_dm_goals.filter(udmg => udmg.complete === true);
  };

  filterForUWMG = goal => {
    return this.props.user.user_wm_goals.filter(
      uwmgoal => uwmgoal.id === goal.user_wm_goal_id
    )[0];
  };

  filterForWMG = goal => {
    return this.props.WMGs.filter(
      wmgoal => wmgoal.id === this.filterForUWMG(goal).wm_goal_id
    )[0];
  };
  completedUWMGs = () => {
    return this.props.user.user_wm_goals.filter(uwmg => uwmg.complete === true);
  };

  updateDMGoal = () => {
    console.log("Crisis Averted");
  };

  toggleHistory = () => {
    this.setState({ historyToggle: !this.state.historyToggle });
  };

  render() {
    return (
      <div className="history">
        <h2>History</h2>
        <Icon name="angle down" />
        <br />

        <br />
        {this.state.historyToggle ? (
          <>
            <Button onClick={this.toggleHistory}>Daily</Button>
            <br />
            <br />
            <Grid columns={2} divided="vertically">
              {this.completedUDMGs()
                .reverse()
                .map(goal => (
                  <Grid.Row>
                    <Grid.Column>
                      {moment(goal.updated_at).format("ddd Do MMM")}
                    </Grid.Column>
                    <Grid.Column>
                      <Button icon="check" size="mini" circular color="green" />
                      {this.filterForWMG(goal).activity}
                    </Grid.Column>
                  </Grid.Row>
                ))}
            </Grid>
          </>
        ) : (
          <>
            <Button onClick={this.toggleHistory}>Weekly</Button>
            <br />
            <br />
            <Grid columns={2} divided="vertically">
              {this.completedUWMGs()
                .reverse()
                .map(goal => (
                  <Grid.Row>
                    <Grid.Column>
                      {moment(goal.updated_at).format("ddd Do MMM")}
                    </Grid.Column>
                    <Grid.Column>
                      <Button circular icon="check" size="mini" color="green" />
                      {
                        this.props.WMGs.filter(
                          wmg => wmg.id === goal.wm_goal_id
                        )[0].activity
                      }{" "}
                      - {goal.number} times
                    </Grid.Column>
                  </Grid.Row>
                ))}
            </Grid>
          </>
        )}
        {/* {console.log(this.completedUDMGs())} */}
        {/* {this.completedUDMGs()
          .reverse()
          .map(goal => (
            <div>
              {moment(goal.updated_at).format("ddd Do MMM")}
              -
              <DMGoal
                dmg={goal}
                WMGs={this.props.WMGs}
                user={this.props.user}
                updateDMGoal={this.updateDMGoal}
              />
            </div>
          ))}
        {this.completedUWMGs()
          // .reverse()
          .map(goal => (
            <div>
              {moment(goal.updated_at).format("ddd Do MMM")} -
              {
                this.props.WMGs.filter(wmg => wmg.id === goal.wm_goal_id)[0]
                  .activity
              }
            </div>
          ))} */}
      </div>
    );
  }
}
export default MindHistory;
