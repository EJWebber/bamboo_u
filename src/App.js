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

  // dmTimeFilter = () => {
  //   const a = moment();
  //   return this.state.user.user_dm_goals.filter(goal =>
  //     // a.diff(new Date(goal.created_at), 'days') <= 0
  //     a.isSame(moment(goal.created_at), "day")
  //   );
  // };

  // dbTimeFilter = () => {
  //   const a = moment();
  //   return this.state.user.user_db_goals.filter(goal =>
  //     // a.diff(new Date(goal.created_at), 'days') <= 0
  //     a.isSame(moment(goal.created_at), "day")
  //   );
  // };

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
            <div>
              <Button id="logout" onClick={this.logOut}>
                Log Out
              </Button>
              <Button.Group id="navbar">
                <Button onClick={this.Btoggle}>Body</Button>
                <Button onClick={this.homeToggle}>Home</Button>
                <Button onClick={this.Mtoggle}>Mind</Button>
              </Button.Group>

              {/* {this.state.toggle ? (
                <div>
                  <h1>Mind</h1>
                  <div className="dailygoals">
                    <h2>Daily Goals</h2>
                    {this.dmTimeFilter().map(dmg => (
                      <DMGoal
                        dmg={dmg}
                        WMGs={this.state.WMGs}
                        user={this.state.user}
                        updateDMGoal={this.updateDMGoal}
                      />
                    ))}
                  </div>
                  <br />
                  <WMGoalContainer
                    WMGs={this.state.WMGs}
                    user={this.state.user}
                    addWMGoal={this.addWMGoal}
                    addDMGoal={this.addDMGoal}
                    updateWMGoal={this.updateWMGoal}
                  />
                  <br />
                  <MindHistory user={this.state.user} WMGs={this.state.WMGs} />
                </div>
              ) : (
                <div>
                  <h1>Body</h1>
                  <div className="dailygoals">
                    <h2>Daily Goals</h2>{" "}
                    {this.dbTimeFilter().map(dbg => (
                      <DBGoal
                        dbg={dbg}
                        WBGs={this.state.WBGs}
                        user={this.state.user}
                        updateDBGoal={this.updateDBGoal}
                      />
                    ))}
                  </div>
                  <br />
                  <WBGoalContainer
                    WBGs={this.state.WBGs}
                    user={this.state.user}
                    addWBGoal={this.addWBGoal}
                    addDBGoal={this.addDBGoal}
                    updateWBGoal={this.updateWBGoal}
                  />
                  <br />
                  <BodyHistory user={this.state.user} WBGs={this.state.WBGs} />
                </div>
              )} */}

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
                />
              ) : (
                <Mind
                  user={this.state.user}
                  updateDMGoal={this.updateDMGoal}
                  WMGs={this.state.WMGs}
                  addWMGoal={this.addWMGoal}
                  addDMGoal={this.addDMGoal}
                  updateWMGoal={this.updateWMGoal}
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
