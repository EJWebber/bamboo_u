import React from "react"
import {Button} from "semantic-ui-react"
import API from "../adapters/API"

class DBGoal extends React.Component {
    filterForUWBG = () => {
        return this.props.user.user_wb_goals.filter(uwbgoal => uwbgoal.id === this.props.dbg.user_wb_goal_id)[0]
    }

    filterForWBG = () => {
        return this.props.WBGs.filter(wbgoal => wbgoal.id === this.filterForUWBG().wb_goal_id)[0]
    }

    handleClick = () => {
        API.updateUserDBG(this.props.dbg).then(console.log)
    }


    render () {
        return (
            <div>
               {this.props.dbg.complete ? 
        <Button circular icon='check' color='green'/> 
        :
        <Button circular icon='check' onClick={this.handleClick}/>
        }
                {this.filterForWBG().activity} today
                
            </div>
        )
    }
}
export default DBGoal