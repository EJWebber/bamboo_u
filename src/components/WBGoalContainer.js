import React from "react"
import { Button } from 'semantic-ui-react'
import WBGoalForm from "../components/WBGoalForm"
import WBGoal from './WBGoal'
const moment = require('moment')

class WBGoalContainer extends React.Component{

state={
    // activity: null,
    // user: this.props.user.id,
    // time: null,
    // toggleWarning: false
    formToggle: false
}

    // dropdownChange = e => {
    //     // console.log(this.props.WMGs.filter(goal => goal.activity === e.target.innerText)[0].id)
    //     this.setState({
    //         activity: this.props.WBGs.filter(goal => goal.activity === e.target.innerText)[0]?
    //         this.props.WBGs.filter(goal => goal.activity === e.target.innerText)[0].id
    //         : this.props.WBGs[0].id
    //     })
    // }

    // setTime = e => {
    //     this.setState({
    //         time: parseInt(e.target.value)
    //     })
    // }

    // handleSubmit = () => {
    //     this.state.time&&this.state.activity ? this.submitWeeklyGoal() : this.setState({toggleWarning:true})
    // }

    // submitWeeklyGoal = () => {
    //     this.setState({toggleWarning:false})
    //     let goal = {user_id: this.state.user, wb_goal_id: this.state.activity, complete: false, time: this.state.time}
    //     API.postUserWBG(goal).then(resp => console.log(resp))
    // }

    WBList(timeFiltered) {
        return (
            <>
            
            <Button onClick={this.showForm}>New Weekly Goal</Button>
            <br />
            <br />
                {
                    timeFiltered.map(goal => 

                        <WBGoal goal={goal} WBGs={this.props.WBGs} user={this.props.user} key={goal.id} addDBGoal={this.props.addDBGoal}/>

                  
                    )}
            </>
        )
    }

    timeFilter = () => {
        const a = moment();
        return this.props.user.user_wb_goals.filter(goal => 
            a.diff(new Date(goal.created_at), 'days') < 7 
        )
    }

    showForm = () => {
        this.setState({formToggle: !this.state.formToggle})
    }

    render(){
        const timeFiltered = this.timeFilter()

        return(
            <div className="container">
                <h1>Weekly Goals</h1>
               {this.state.formToggle ? 
                <WBGoalForm user={this.props.user} WBGs={this.props.WBGs} addWBGoal={this.props.addWBGoal} showForm={this.showForm}/> 
                :
                this.WBList(timeFiltered)
                }
                
              
            </div>
        )
    }
}
export default WBGoalContainer