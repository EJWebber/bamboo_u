import React from "react";
import Graph from "./Graph";
class Home extends React.Component {
  completedUDMGs = () => {
    return this.props.user.user_dm_goals.filter(udmg => udmg.complete === true);
  };
  completedUDBGs = () => {
    return this.props.user.user_db_goals.filter(udbg => udbg.complete === true);
  };

  render() {
    return (
      <div className="test">
        <div className="graph-1">
          <Graph dailyGoals={this.completedUDBGs()} />
          <div className="root-1" />
        </div>
        <div className="graph-2">
          <Graph dailyGoals={this.completedUDMGs()} />
          <div className="root-2" />
        </div>
      </div>
    );
  }
}
export default Home;
