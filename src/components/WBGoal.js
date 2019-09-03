import React from "react"
// import CreateDBGoal from "./CreateDBGoal"
import {Button, Grid} from "semantic-ui-react"
import API from "../adapters/API";

class WBGoal extends React.Component {
    
    state = {
        userWBG : {}
    }
    
    componentDidMount(){
        this.fetchUserWBG()
    }

    fetchUserWBG = () => {
        API.fetchUserWBG(this.props.goal.id).then(resp => this.setState({userWBG: resp}))
    }

    handleClick = () => {
        const dailyGoal = {user_wb_goal_id: this.props.goal.id, complete: false}
        API.postUserDBG(dailyGoal).then(this.props.addDBGoal)
    }

    render(){

        const filteredWBGs = this.props.WBGs.filter(wbg => wbg.id === this.props.goal.wb_goal_id)[0]
        // const timeFiltered = filteredWMGs.filter(goal => )
        return(
            <div>
                
            <Grid divided='vertically'>
            <Grid.Row columns={2}>
            <Grid.Column>
                {filteredWBGs.activity} for {this.props.goal.time} minutes this week
            </Grid.Column>
             <Grid.Column>
                <Button onClick={this.handleClick}>Get a daily goal</Button>
            </Grid.Column>
             </Grid.Row>
             </Grid>
               <br />
            </div>
        )
    }
}
export default WBGoal