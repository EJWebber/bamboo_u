import React from "react";
import "./App.css";
import API from "./adapters/API";
import SignIn from "./components/SignIn";
import Body from "./body/Body";
import Mind from "./mind/Mind";
import Home from "./components/Home";
// import WMGoalContainer from "./components/WMGoalContainer";
// import WBGoalContainer from "./components/WBGoalContainer";
import { Button } from "semantic-ui-react";
// import DMGoal from "./components/DMGoal";
// import DBGoal from "./components/DBGoal";
// import MindHistory from "./components/MindHistory";
// import BodyHistory from "./components/BodyHistory";
// const moment = require("moment");

class App extends React.Component {
  state = {
    user:
      // {name: "Ed", id: 1},
      { error: "Please Login or Sign Up" },
    WBGs: [],
    WMGs: [],
    homeToggle: true,
    BMtoggle: false
  };

  componentDidMount() {
    this.fetchAllWBGs();
    this.fetchAllWMGs();
  }

  fetchAllWBGs = () => {
    API.fetchAllWBGs().then(goals =>
      goals.forEach(goal =>
        this.setState({
          WBGs: [...this.state.WBGs, goal]
        })
      )
    );
  };

  fetchAllWMGs = () => {
    API.fetchAllWMGs().then(goals =>
      goals.forEach(goal =>
        this.setState({
          WMGs: [...this.state.WMGs, goal]
        })
      )
    );
  };

  fetchUser = (n, password) => {
    API.fetchUser().then(users =>
      this.setState({
        user:
          users.filter(u => u.name === n).length > 0
            ? users.filter(u => u.name === n)[0]
            : { error: "User not found" }
      })
    );
  };

  handleSignUp = (newName, newPassword) => {
    API.postUser({ name: newName, password: newPassword }).then(u =>
      u.error
        ? this.setState({ user: { error: "Name taken" } })
        : this.setState({ user: u })
    );
  };

  logOut = () => {
    this.setState({
      user: { error: "Please Login or Sign Up" },
      homeToggle: true
    });
  };

  Btoggle = () => {
    this.setState({ BMtoggle: true, homeToggle: false });
  };
  Mtoggle = () => {
    this.setState({ BMtoggle: false, homeToggle: false });
  };
  homeToggle = () => {
    this.setState({ homeToggle: true });
  };

  addWMGoal = goal => {
    this.setState({
      user: {
        ...this.state.user,
        user_wm_goals: [...this.state.user.user_wm_goals, goal]
      }
    });
  };

  addWBGoal = goal => {
    this.setState({
      user: {
        ...this.state.user,
        user_wb_goals: [...this.state.user.user_wb_goals, goal]
      }
    });
  };

  addDBGoal = goal => {
    this.setState({
      user: {
        ...this.state.user,
        user_db_goals: [...this.state.user.user_db_goals, goal]
      }
    });
  };

  addDMGoal = goal => {
    this.setState({
      user: {
        ...this.state.user,
        user_dm_goals: [...this.state.user.user_dm_goals, goal]
      }
    });
  };

  updateDBGoal = goal => {
    const unfilteredGoals = this.state.user.user_db_goals;
    const filteredGoals = unfilteredGoals.filter(g => g.id !== goal.id);
    const unsortedGoals = [...filteredGoals, goal];
    const sortedGoals = unsortedGoals.sort(function(a, b) {
      return a.id - b.id;
    });
    this.setState({
      user: { ...this.state.user, user_db_goals: sortedGoals }
    });
  };

  updateWBGoal = goal => {
    const unfilteredGoals = this.state.user.user_wb_goals;
    const filteredGoals = unfilteredGoals.filter(g => g.id !== goal.id);
    const unsortedGoals = [...filteredGoals, goal];
    const sortedGoals = unsortedGoals.sort(function(a, b) {
      return a.id - b.id;
    });
    this.setState({
      user: { ...this.state.user, user_wb_goals: sortedGoals }
    });
  };

  updateDMGoal = goal => {
    const unfilteredGoals = this.state.user.user_dm_goals;
    const filteredGoals = unfilteredGoals.filter(g => g.id !== goal.id);
    const unsortedGoals = [...filteredGoals, goal];
    const sortedGoals = unsortedGoals.sort(function(a, b) {
      return a.id - b.id;
    });
    this.setState({
      user: { ...this.state.user, user_dm_goals: sortedGoals }
    });
  };

  updateWMGoal = goal => {
    const unfilteredGoals = this.state.user.user_wm_goals;
    const filteredGoals = unfilteredGoals.filter(g => g.id !== goal.id);
    const unsortedGoals = [...filteredGoals, goal];
    const sortedGoals = unsortedGoals.sort(function(a, b) {
      return a.id - b.id;
    });
    this.setState({
      user: { ...this.state.user, user_wm_goals: sortedGoals }
    });
  };

  removeWBG = goal => {
    const unfilteredWGoals = this.state.user.user_wb_goals;
    const filteredWGoals = unfilteredWGoals.filter(uwbg => uwbg.id !== goal.id);
    const unfilteredDGoals = this.state.user.user_db_goals;
    const filteredDGoals = unfilteredDGoals.filter(
      udbg => udbg.user_wb_goal_id !== goal.id
    );
    this.setState({
      user: {
        ...this.state.user,
        user_wb_goals: filteredWGoals,
        user_db_goals: filteredDGoals
      }
    });
  };

  removeDBG = goal => {
    const unfilteredDGoals = this.state.user.user_db_goals;
    const filteredDGoals = unfilteredDGoals.filter(udbg => udbg.id !== goal.id);
    this.setState({
      user: { ...this.state.user, user_db_goals: filteredDGoals }
    });
  };

  removeWMG = goal => {
    const unfilteredWGoals = this.state.user.user_wm_goals;
    const filteredWGoals = unfilteredWGoals.filter(uwmg => uwmg.id !== goal.id);
    const unfilteredDGoals = this.state.user.user_dm_goals;
    const filteredDGoals = unfilteredDGoals.filter(
      udmg => udmg.user_wm_goal_id !== goal.id
    );
    this.setState({
      user: {
        ...this.state.user,
        user_wm_goals: filteredWGoals,
        user_dm_goals: filteredDGoals
      }
    });
  };

  removeDMG = goal => {
    const unfilteredDGoals = this.state.user.user_dm_goals;
    const filteredDGoals = unfilteredDGoals.filter(udmg => udmg.id !== goal.id);
    this.setState({
      user: { ...this.state.user, user_dm_goals: filteredDGoals }
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.user.error ? (
            <SignIn
              fetchUser={this.fetchUser}
              handleSignUp={this.handleSignUp}
              error={this.state.user}
            />
          ) : (
            <div className="div">
              <Button id="logout" onClick={this.logOut} size="mini">
                Log Out
              </Button>
              <Button.Group id="navbar">
                <Button onClick={this.Btoggle}>Body</Button>
                <Button onClick={this.homeToggle}>Home</Button>
                <Button onClick={this.Mtoggle}>Mind</Button>
              </Button.Group>

              {this.state.homeToggle ? (
                <Home user={this.state.user} />
              ) : this.state.BMtoggle ? (
                <Body
                  user={this.state.user}
                  updateDBGoal={this.updateDBGoal}
                  WBGs={this.state.WBGs}
                  addWBGoal={this.addWBGoal}
                  addDBGoal={this.addDBGoal}
                  updateWBGoal={this.updateWBGoal}
                  removeWBG={this.removeWBG}
                  removeDBG={this.removeDBG}
                />
              ) : (
                <Mind
                  user={this.state.user}
                  updateDMGoal={this.updateDMGoal}
                  WMGs={this.state.WMGs}
                  addWMGoal={this.addWMGoal}
                  addDMGoal={this.addDMGoal}
                  updateWMGoal={this.updateWMGoal}
                  removeWMG={this.removeWMG}
                  removeDMG={this.removeDMG}
                />
              )}
            </div>
          )}
        </header>
      </div>
    );
  }
}
export default App;
