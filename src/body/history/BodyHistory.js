import React from "react";
// import DBGoal from "../daily/DBGoal";
import { Grid, Button, Icon } from "semantic-ui-react";
const moment = require("moment");

class BodyHistory extends React.Component {
  state = {
    historyToggle: true
  };

  completedUDBGs = () => {
    return this.props.user.user_db_goals.filter(udbg => udbg.complete === true);
  };

  filterForUWBG = goal => {
    return this.props.user.user_wb_goals.filter(
      uwbgoal => uwbgoal.id === goal.user_wb_goal_id
    )[0];
  };

  filterForWBG = goal => {
    return this.props.WBGs.filter(
      wbgoal => wbgoal.id === this.filterForUWBG(goal).wb_goal_id
    )[0];
  };

  completedUWBGs = () => {
    return this.props.user.user_wb_goals.filter(uwbg => uwbg.complete === true);
  };
  updateDBGoal = () => {
    console.log("Crisis Averted");
  };
  toggleHistory = () => {
    this.setState({
      historyToggle: !this.state.historyToggle
    });
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
              {this.completedUDBGs()
                .reverse()
                .map(goal => (
                  <Grid.Row>
                    <Grid.Column>
                      {moment(goal.updated_at).format("ddd Do MMM")}
                    </Grid.Column>

                    <Grid.Column>
                      <Button icon="check" size="mini" circular color="green" />
                      {this.filterForWBG(goal).activity} - {goal.time} mins
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
              {this.completedUWBGs()
                .reverse()
                .map(goal => (
                  <Grid.Row>
                    <Grid.Column>
                      {moment(goal.updated_at).format("ddd Do MMM")}
                    </Grid.Column>
                    <Grid.Column>
                      <Button circular icon="check" color="green" size="mini" />
                      {
                        this.props.WBGs.filter(
                          wbg => wbg.id === goal.wb_goal_id
                        )[0].activity
                      }{" "}
                      - {goal.time} mins
                    </Grid.Column>
                  </Grid.Row>
                ))}
            </Grid>
          </>
        )}
      </div>
    );
  }
}
export default BodyHistory;
