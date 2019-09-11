import React from "react";
import DBGoal from "./DBGoal";
import { Divider, Header, Grid } from "semantic-ui-react";
const moment = require("moment");

class DBGoalContainer extends React.Component {
  dbTimeFilter = () => {
    const a = moment();
    return this.props.user.user_db_goals.filter(goal =>
      a.isSame(moment(goal.created_at), "day")
    );
  };

  render() {
    return (
      <React.Fragment>
        <Divider horizontal>
          <Header as="h2">Daily</Header>
        </Divider>
        {this.dbTimeFilter().length}/3 goals assigned
        <br />
        <br />
        <Grid columns={4} className="dailyGrid">
          {this.dbTimeFilter().map(dbg => (
            <DBGoal
              dbg={dbg}
              user={this.props.user}
              updateDBGoal={this.props.updateDBGoal}
              WBGs={this.props.WBGs}
              removeDBG={this.props.removeDBG}
            />
          ))}
        </Grid>
      </React.Fragment>
    );
  }
}
export default DBGoalContainer;
