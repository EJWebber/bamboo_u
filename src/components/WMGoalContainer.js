import React from "react"
import {Button} from 'semantic-ui-react'
import WMGoalForm from "./WMGoalForm"
import WMGoal from "./WMGoal"
const moment = require('moment')

class WMGoalContainer extends React.Component {

    state = {
        // activity: null,
        // user: this.props.user.id,
        // times: null,
        // toggleWarning: false,
        // allWMGs: this.props.WMGs,
        // allUserWMGs: [],
        formToggle: false
    }

    // componentDidMount() {
    //     this.fetchAllUserWMGs()
    // }

    // fetchAllUserWMGs = () => {
    //     API.fetchUserWMGs().then(resp => this.setState({
    //         allUserWMGs: resp.filter(goal => goal.user_id === this.state.user)
    //     }))
    // }

    // addWMGoal = goal => {
    //     this.setState({ allUserWMGs: [...this.state.allUserWMGs, goal] })
    // }

    WMList(timeFiltered) {
        return (
            <>
            
            <Button onClick={this.showForm}>New Weekly Goal</Button>
            <br />
            <br />
                {
                    timeFiltered.map(goal => <div>

                        <WMGoal goal={goal} WMGs={this.props.WMGs} user={this.props.user} key={goal.id} addDMGoal={this.props.addDMGoal}/>

                    </div>
                    )}
            </>
        )
    }

    timeFilter = () => {
        const a = moment();
        return this.props.user.user_wm_goals.filter(goal => 
            a.diff(new Date(goal.created_at), 'days') < 7 
        )
    }

    showForm = () => {
        this.setState({formToggle: !this.state.formToggle})
    }

    render() {
        // const filteredWMGs = this.props.WMGs.filter(wmg => wmg.id === goal.wm_goal_id)
        const timeFiltered = this.timeFilter()
        
        return (
            <div className="container">
                
                <h1>Weekly Goals</h1>
                {this.state.formToggle ? 
                <WMGoalForm user={this.props.user} WMGs={this.props.WMGs} addWMGoal={this.props.addWMGoal} showForm={this.showForm}/> 
                :
                this.WMList(timeFiltered)
                }

                {/* {this.state.allUserWMGs.map(goal => <div>
                
                 <WMGoal goal={goal} WMGs={this.props.WMGs}/>
                
                </div>
                )} */}


            </div>
        )
    }
}
export default WMGoalContainer