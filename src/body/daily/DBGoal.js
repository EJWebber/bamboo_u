import React from "react";
import { Input, Button } from "semantic-ui-react";
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

  deleteGoal = goal => {
    API.deleteUserDBG(goal);
    this.props.removeDBG(goal);
  };

  render() {
    return (
      <div>
        {this.props.dbg.complete ? (
          <div>
            <Button icon="check" size="mini" circular color="green" />
            {this.filterForWBG().activity} - {this.props.dbg.time} mins
          </div>
        ) : (
          <div>
            <Button
              icon="check"
              circular
              size="mini"
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
        )}
        <Button
          size="mini"
          circular
          icon="close"
          color="red"
          onClick={() => this.deleteGoal(this.props.dbg)}
        />
      </div>
    );
  }
}
export default DBGoal;
