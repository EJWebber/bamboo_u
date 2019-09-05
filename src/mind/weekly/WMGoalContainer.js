import React from "react";
import { Button } from "semantic-ui-react";
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
        <Button onClick={this.showForm}>New Weekly Goal</Button>
        <br />
        <br />
        {timeFiltered.map(goal => (
          <div>
            <WMGoal
              goal={goal}
              WMGs={this.props.WMGs}
              user={this.props.user}
              key={goal.id}
              addDMGoal={this.props.addDMGoal}
              updateWMGoal={this.props.updateWMGoal}
            />
          </div>
        ))}
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
      <div className="container">
        <h2>Weekly Goals</h2>
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
      </div>
    );
  }
}
export default WMGoalContainer;
