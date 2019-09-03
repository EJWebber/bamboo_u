import React from "react"
import { Dropdown, Input, Label, Button } from 'semantic-ui-react'
import API from "../adapters/API"

class WMGoalForm extends React.Component {

    state = {
        activity: null,
        
        times: null,
        toggleWarning: false,
        dropdownOptions: []
    }

    componentDidMount() {
        this.dropdownOptions()
    }

    dropdownChange = e => {
        // console.log(this.props.WMGs.filter(goal => goal.activity === e.target.innerText)[0].id)
        this.setState({
            activity: this.props.WMGs.filter(goal => goal.activity === e.target.innerText)[0] ?
                this.props.WMGs.filter(goal => goal.activity === e.target.innerText)[0].id
                : this.props.WMGs[0].id
        })
    }

    setTimes = e => {
        this.setState({
            times: parseInt(e.target.value)
        })
    }

    handleSubmit = () => {
        this.state.times && this.state.activity ? this.submitWeeklyGoal() : this.setState({ toggleWarning: true })
    }

    submitWeeklyGoal = () => {
        this.setState({ toggleWarning: false })
        let goal = { user_id: this.props.user.id, wm_goal_id: this.state.activity, complete: false, number: this.state.times }
        API.postUserWMG(goal).then(
        this.props.addWMGoal)
        this.props.showForm()
    }

    dropdownOptions = () => {
        const dropdownOptions = this.props.WMGs.map(goal => {
            return { key: goal.id, text: goal.activity, value: goal.id }
        })
        this.setState({ dropdownOptions })
    }

    cancelSubmit = () => {
        this.props.showForm()
    }

    render() {


        return (<div className="form">
            Create a new Weekly Mind Goal:
            <br />
            <br />
            <Dropdown
                placeholder='Select Activity'
                fluid
                selection
                options={this.state.dropdownOptions}
                onChange={e => this.dropdownChange(e)}
            />
            <br />
            <Input labelPosition='right' type='text' placeholder='How many times?' >
                <input onChange={e => this.setTimes(e)}></ input>
                <Label>times</Label>
            </Input>
            <br />
            {this.state.toggleWarning ? <div>Please complete both fields</div> : null}
            <br />
            <Button.Group>
            <Button className="ui negative button" onClick={this.cancelSubmit}>Cancel</Button>
            <Button className="ui positive button" onClick={this.handleSubmit}>Set Goal</Button>
            </Button.Group>
            <br />
            <br />
        </div>
        )
    }
}

export default WMGoalForm