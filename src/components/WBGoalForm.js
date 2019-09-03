import React from "react"
import { Dropdown, Input, Label, Button } from 'semantic-ui-react'
import API from "../adapters/API"

class WBGoalForm extends React.Component {

    state = {
        activity: null,
        
        time: null,
        toggleWarning: false,
        dropdownOptions: []
    }

    componentDidMount() {
        this.dropdownOptions()
    }

    dropdownChange = e => {
        // console.log(this.props.WMGs.filter(goal => goal.activity === e.target.innerText)[0].id)
        this.setState({
            activity: this.props.WBGs.filter(goal => goal.activity === e.target.innerText)[0] ?
                this.props.WBGs.filter(goal => goal.activity === e.target.innerText)[0].id
                : this.props.WBGs[0].id
        })
    }

    setTime = e => {
        this.setState({
            time: parseInt(e.target.value)
        })
    }

    handleSubmit = () => {
        this.state.time && this.state.activity ? this.submitWeeklyGoal() : this.setState({ toggleWarning: true })
    }

    submitWeeklyGoal = () => {
        this.setState({ toggleWarning: false })
        let goal = { user_id: this.props.user.id, wb_goal_id: this.state.activity, complete: false, time: this.state.time }
        API.postUserWBG(goal).then(
        this.props.addWBGoal)
        this.props.showForm()
    }

    dropdownOptions = () => {
        const dropdownOptions = this.props.WBGs.map(goal => {
            return { key: goal.id, text: goal.activity, value: goal.id }
        })
        this.setState({ dropdownOptions })
    }

    cancelSubmit = () => {
        this.props.showForm()
    }

    render() {


        return (<div className="form">
            Create a new Weekly Body Goal:
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
            <Input labelPosition='right' type='text' placeholder='For how long?' >
                <input onChange={e => this.setTime(e)}></ input>
                <Label>minutes</Label>
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

export default WBGoalForm