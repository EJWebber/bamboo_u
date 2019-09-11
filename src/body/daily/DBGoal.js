import React from "react";
import { Input, Button, Label, Grid } from "semantic-ui-react";
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
      <Grid.Row>
        {this.props.dbg.complete ? (
          <>
            <Grid.Column>
              <Button size="mini" color="green">
                Completed
              </Button>
            </Grid.Column>
            <Grid.Column>{this.filterForWBG().activity}</Grid.Column>
            <Grid.Column>{this.props.dbg.time} mins</Grid.Column>
          </>
        ) : (
          <>
            <Grid.Column>
              <Button size="mini" color="yellow" onClick={this.handleClick}>
                Completed?
              </Button>
            </Grid.Column>
            <Grid.Column>{this.filterForWBG().activity} </Grid.Column>{" "}
            <Grid.Column>
              <Input
                size="mini"
                placeholder="time"
                onChange={e => this.setTime(e)}
              />
            </Grid.Column>
          </>
        )}
        <Grid.Column>
          <Label
            color="red"
            size="mini"
            floating
            onClick={() => this.deleteGoal(this.props.dbg)}
          >
            x
          </Label>
        </Grid.Column>
      </Grid.Row>
    );
  }
}
export default DBGoal;
