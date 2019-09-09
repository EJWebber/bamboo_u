import React from "react";
import { Button, Input, Label, Table } from "semantic-ui-react";
import API from "../../adapters/API";

class DBGoal extends React.Component {
  state = {
    time: 0
  };
  filterForUWBG = () => {
    return this.props.user.user_wb_goals.filter(
      uwbgoal => uwbgoal.id === this.props.dbg.user_wb_goal_id
    )[0];
  };

  filterForWBG = () => {
    return this.props.WBGs.filter(
      wbgoal => wbgoal.id === this.filterForUWBG().wb_goal_id
    )[0];
  };

  handleClick = () => {
    API.updateUserDBG(this.props.dbg, this.state.time).then(
      this.props.updateDBGoal
    );
  };

  setTime = e => {
    this.setState({
      time: e.target.value
    });
  };

  render() {
    return (
      <div>
        <Table.Row textAlign="center">
          {this.props.dbg.complete ? (
            // <Table.Cell>
            <div>
              <Button circular size="mini" icon="check" color="green" />
              {this.filterForWBG().activity} - {this.props.dbg.time} mins
            </div>
          ) : (
            // </Table.Cell>
            // <Table.Cell>
            <div>
              <Button
                circular
                size="mini"
                icon="check"
                color="yellow"
                onClick={this.handleClick}
              />
              {this.filterForWBG().activity}
              <Input
                size="mini"
                placeholder="time"
                onChange={e => this.setTime(e)}
              />
            </div>
            // </Table.Cell>
          )}
        </Table.Row>
      </div>
    );
  }
}
export default DBGoal;
