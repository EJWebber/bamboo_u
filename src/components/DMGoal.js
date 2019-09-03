import React from "react"
import {Button} from "semantic-ui-react"
import API from "../adapters/API"

class DMGoal extends React.Component {
    
    filterForUWMG = () => {
        return this.props.user.user_wm_goals.filter(uwmgoal => uwmgoal.id === this.props.dmg.user_wm_goal_id)[0]
    }

    filterForWMG = () => {
        return this.props.WMGs.filter(wmgoal => wmgoal.id === this.filterForUWMG().wm_goal_id)[0]
    }

    handleClick = () => {
        API.updateUserDMG(this.props.dmg).then(console.log)
    }

    
    render () {
return (
    <div>
        {this.props.dmg.complete ? 
        <Button circular icon='check' color='green'/> 
        :
        <Button circular icon='check' onClick={this.handleClick}/>
        }
    {this.filterForWMG().activity} today
    </div>
)

    }
}

export default DMGoal