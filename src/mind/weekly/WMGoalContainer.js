import React from "react";
import { Button, Icon, Header, Divider } from "semantic-ui-react";
import WMGoalForm from "./WMGoalForm";
import WMGoal from "./WMGoal";
const moment = require("moment");

class WMGoalContainer extends React.Component {
  state = {
    formToggle: false
  };

  WMList(timeFiltered) {
    return (
      <>
        {/* {timeFiltered.length}/3 goals assigned: */}
        {timeFiltered.map(goal => (
          <div>
            <WMGoal
              goal={goal}
              WMGs={this.props.WMGs}
              user={this.props.user}
              key={goal.id}
              addDMGoal={this.props.addDMGoal}
              updateWMGoal={this.props.updateWMGoal}
              removeWMG={this.props.removeWMG}
            />
          </div>
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
    return this.props.user.user_wm_goals.filter(goal =>
      // a.diff(new Date(goal.created_at), 'days') < 7
      a.isBefore(moment(goal.created_at).add(7, "days"))
    );
  };

  showForm = () => {
    this.setState({ formToggle: !this.state.formToggle });
  };

  render() {
    // const filteredWMGs = this.props.WMGs.filter(wmg => wmg.id === goal.wm_goal_id)
    const timeFiltered = this.timeFilter();

    return (
      <React.Fragment>
        <Divider horizontal>
          <Header as="h2">Weekly</Header>
        </Divider>
        {this.state.formToggle ? (
          <WMGoalForm
            user={this.props.user}
            WMGs={this.props.WMGs}
            addWMGoal={this.props.addWMGoal}
            showForm={this.showForm}
          />
        ) : (
          this.WMList(timeFiltered)
        )}

        {/* {this.state.allUserWMGs.map(goal => <div>
                
                 <WMGoal goal={goal} WMGs={this.props.WMGs}/>
                
                </div>
                )} */}
      </React.Fragment>
    );
  }
}
export default WMGoalContainer;
