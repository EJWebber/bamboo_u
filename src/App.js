import React from 'react';
import './App.css';
import API from './adapters/API'
import SignIn from './components/SignIn'
import WMGoalContainer from './components/WMGoalContainer'
import WBGoalContainer from './components/WBGoalContainer'
import { Button, Grid } from "semantic-ui-react"
import DMGoal from "./components/DMGoal"
import DBGoal from "./components/DBGoal"
const moment = require('moment')

class App extends React.Component {
  state={
    user: 
    // {name: "Ed", id: 1}, 
    {error: "Please Login or Sign Up"},
    WBGs: [],
    WMGs: [],
    toggle: true
  }

componentDidMount(){
  this.fetchAllWBGs()
  this.fetchAllWMGs()
}

  fetchAllWBGs = () => {
    API.fetchAllWBGs().then(goals => goals.forEach(goal => this.setState({
      WBGs: [...this.state.WBGs, goal]
    })))
  }

  fetchAllWMGs = () => {
    API.fetchAllWMGs().then(goals => goals.forEach(goal => this.setState({
      WMGs: [...this.state.WMGs, goal]
    })))
  }

  fetchUser = (n, password) => {
   API.fetchUser().then(users => 
    this.setState({user: 
      users.filter(u => u.name === n).length > 0? users.filter(u => u.name === n)[0] : {error: "User not found"}
      
    })
   )
  }

  handleSignUp = (newName, newPassword) => {
    API.postUser(
      {name: newName, password: newPassword}
      ).then(u => u.error ? 
        this.setState({user: {error: "Name taken"}})
        :
        this.setState({user: u.user})
        )
      
  }

  logOut = () => {
    this.setState({
      user: {error: "Please Login or Sign Up"}
    })
  }

  toggle = () => {
    this.setState({toggle: !this.state.toggle})
  }

  addWMGoal = goal => {
        this.setState({ user:  {...this.state.user, user_wm_goals:[...this.state.user.user_wm_goals, goal] }})
    }

    addWBGoal = goal => {
      this.setState({ user:  {...this.state.user, user_wb_goals:[...this.state.user.user_wb_goals, goal] }})
    }

    addDBGoal = goal => {
      this.setState({ user:  {...this.state.user, user_db_goals:[...this.state.user.user_db_goals, goal] }})
    }

    addDMGoal = goal => {
      this.setState({ user:  {...this.state.user, user_dm_goals:[...this.state.user.user_dm_goals, goal] }})
    }



    dmTimeFilter = () => {
      const a = moment();
      return this.state.user.user_dm_goals.filter(goal => 
          a.diff(new Date(goal.created_at), 'days') <= 1 
      )
  }

  dbTimeFilter = () => {
    const a = moment();
    return this.state.user.user_db_goals.filter(goal => 
        a.diff(new Date(goal.created_at), 'days') <= 1 
    )
}

  render(){
    
  return (
    <div className="App">
      <header className="App-header">
        
       {this.state.user.error?
       <SignIn fetchUser={this.fetchUser} handleSignUp={this.handleSignUp} error={this.state.user}/>
        : 
        <div>
       <Button id="logout" onClick={this.logOut}>Log Out</Button>
       <Button.Group id="navbar">
        <Button onClick={this.toggle}>Body</Button>
        <Button onClick={this.toggle}>Mind</Button>
       </Button.Group>

        
        <Grid divided='vertically' className="dailygoals">
    <Grid.Row columns={2}>
      <Grid.Column>
      Daily Body Goal: {this.dbTimeFilter().map(dbg => <DBGoal dbg={dbg} WBGs={this.state.WBGs} user={this.state.user}/>)}
      </Grid.Column>
      <Grid.Column>
      Daily Mind Goal: {this.dmTimeFilter().map(dmg => <DMGoal dmg={dmg} WMGs={this.state.WMGs} user={this.state.user}/>)}
      </Grid.Column>
    </Grid.Row>
      </Grid>
      
      {this.state.toggle ?
       <WMGoalContainer WMGs={this.state.WMGs} user={this.state.user} addWMGoal={this.addWMGoal} addDMGoal={this.addDMGoal} />
        :
       <WBGoalContainer WBGs={this.state.WBGs} user={this.state.user} addWBGoal={this.addWBGoal} addDBGoal={this.addDBGoal} />
       }
       </div>
       }
      </header>
    </div>
  );
}
}
export default App;
