import React from "react"
import DBGoal from "./DBGoal"
const moment = require('moment')

class BodyHistory extends React.Component {
    completedUDBGs = () => {
        return this.props.user.user_db_goals.filter(uwbg => uwbg.complete === true)
    }
    updateDBGoal = () => {
        console.log("Crisis Averted")
    }

    render(){
        return(
            <div className="history">
                <h2>History</h2>
                {this.completedUDBGs().reverse().map(goal => 
                <div>
                {moment(goal.updated_at).format("ddd Do MMM")}
                 - 
                <DBGoal dbg={goal} WBGs={this.props.WBGs} user={this.props.user} updateDBGoal={this.updateDBGoal} />
                </div>
                )}
            </div>
        )
    }
}
export default BodyHistory