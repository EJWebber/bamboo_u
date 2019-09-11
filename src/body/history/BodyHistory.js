import React from "react";
import DBGoal from "../daily/DBGoal";
import { Grid, Button, Checkbox } from "semantic-ui-react";
const moment = require("moment");

class BodyHistory extends React.Component {
  state = {
    historyToggle: true
  };

  completedUDBGs = () => {
    return this.props.user.user_db_goals.filter(udbg => udbg.complete === true);
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

        {this.state.historyToggle ? (
          <Grid columns={2} divided="vertically">
            <Button onClick={this.toggleHistory}>Daily</Button>
            {this.completedUDBGs()
              .reverse()
              .map(goal => (
                <Grid.Row>
                  <Grid.Column>
                    {moment(goal.updated_at).format("ddd Do MMM")}
                  </Grid.Column>

                  <Grid.Column>
                    <DBGoal
                      dbg={goal}
                      WBGs={this.props.WBGs}
                      user={this.props.user}
                      updateDBGoal={this.updateDBGoal}
                    />
                  </Grid.Column>
                </Grid.Row>
              ))}
          </Grid>
        ) : (
          <Grid columns={2} divided="vertically">
            <Button onClick={this.toggleHistory}>Weekly</Button>
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
        )}
      </div>
    );
  }
}
export default BodyHistory;
