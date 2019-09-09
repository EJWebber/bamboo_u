import React from "react";
import DBGoal from "./DBGoal";
import { Divider, Header } from "semantic-ui-react";
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
        {/* {this.dbTimeFilter().length}/3 goals assigned */}

        {this.dbTimeFilter().map(dbg => (
          <DBGoal
            dbg={dbg}
            user={this.props.user}
            updateDBGoal={this.props.updateDBGoal}
            WBGs={this.props.WBGs}
          />
        ))}
      </React.Fragment>
    );
  }
}
export default DBGoalContainer;
