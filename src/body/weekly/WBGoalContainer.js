import React from "react";
import { Button, Icon, Header, Divider } from "semantic-ui-react";
import WBGoalForm from "./WBGoalForm";
import WBGoal from "./WBGoal";
const moment = require("moment");

class WBGoalContainer extends React.Component {
  state = {
    formToggle: false
  };

  WBList(timeFiltered) {
    return (
      <>
        {timeFiltered.map(goal => (
          <WBGoal
            goal={goal}
            WBGs={this.props.WBGs}
            user={this.props.user}
            key={goal.id}
            addDBGoal={this.props.addDBGoal}
            updateWBGoal={this.props.updateWBGoal}
          />
        ))}

        {timeFiltered.length < 3 ? (
          <Button onClick={this.showForm}>
            Weekly Goal <Icon name="plus" />
          </Button>
        ) : null}
      </>
    );
  }

  timeFilter = () => {
    const a = moment();

    return this.props.user.user_wb_goals.filter(goal =>
      // a.diff(new Date(goal.created_at), 'days') < 7
      a.isBefore(moment(goal.created_at).add(7, "days"))
    );
  };

  showForm = () => {
    this.setState({ formToggle: !this.state.formToggle });
  };

  render() {
    const timeFiltered = this.timeFilter();

    return (
      <React.Fragment>
        <Divider horizontal>
          <Header as="h2">Weekly</Header>
        </Divider>
        {/* {timeFiltered.length}/3 goals assigned */}

        {this.state.formToggle ? (
          <WBGoalForm
            user={this.props.user}
            WBGs={this.props.WBGs}
            addWBGoal={this.props.addWBGoal}
            showForm={this.showForm}
          />
        ) : (
          this.WBList(timeFiltered)
        )}
      </React.Fragment>
    );
  }
}
export default WBGoalContainer;
