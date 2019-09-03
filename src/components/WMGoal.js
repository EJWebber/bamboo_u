import React from "react"
// import CreateDMGoal from "./CreateDMGoal"
import {Button, Grid} from "semantic-ui-react"
import API from "../adapters/API";

class WMGoal extends React.Component {
    
    state = {
        userWMG : {}
    }
    
    componentDidMount(){
        this.fetchUserWMG()
    }

    fetchUserWMG = () => {
        API.fetchUserWMG(this.props.goal.id).then(resp => this.setState({userWMG: resp}))
    }

    handleClick = () => {
        const dailyGoal = {user_wm_goal_id: this.props.goal.id, complete: false}
        API.postUserDMG(dailyGoal).then(this.props.addDMGoal)
    }

    render(){

        const filteredWMGs = this.props.WMGs.filter(wmg => wmg.id === this.props.goal.wm_goal_id)[0]
        // const timeFiltered = filteredWMGs.filter(goal => )
        return(
            <div>
                
                <Grid divided='vertically'>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        {filteredWMGs.activity} {this.props.goal.number} times this week
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
export default WMGoal