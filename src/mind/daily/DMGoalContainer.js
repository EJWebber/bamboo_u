import React from "react";
import DMGoal from "./DMGoal";
import { Divider, Header, Grid } from "semantic-ui-react";
const moment = require("moment");

class DMGoalContainer extends React.Component {
  dmTimeFilter = () => {
    const a = moment();
    return this.props.user.user_dm_goals.filter(goal =>
      a.isSame(moment(goal.created_at), "day")
    );
  };

  render() {
    return (
      <React.Fragment>
        <Divider horizontal>
          <Header as="h2">Daily</Header>
        </Divider>
        {this.dmTimeFilter().length}/3 goals assigned
        <br />
        <br />
        <Grid columns={3} className="dailyGridTwo">
          {this.dmTimeFilter().map(dmg => (
            <DMGoal
              dmg={dmg}
              user={this.props.user}
              updateDMGoal={this.props.updateDMGoal}
              WMGs={this.props.WMGs}
              removeDMG={this.props.removeDMG}
            />
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}
export default DMGoalContainer;
