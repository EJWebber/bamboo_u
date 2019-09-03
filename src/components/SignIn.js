import React from 'react'
import { Button, Form } from "semantic-ui-react";

class SignUp extends React.Component{
    state = {
        newName: "",
        newPassword: "",
        name: "",
        password: "",
        menu: true
    }

    handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };

      loginToggle = () => {
        this.setState({menu: true})
      }
      signupToggle = () => {
        this.setState({menu: false})
      }

    render(){
        return(
        <div>
          <h1 className="ui center aligned header" id="title">Bamboo-U</h1>
          
          <div>{this.props.error.error ? this.props.error.error : "User not found"}</div>
          
          <br />
          
          <div className="ui buttons">
            <button className="ui positive button" onClick={this.loginToggle}>Login</button>
          <div className="or"></div>
            <button className="ui positive button" onClick={this.signupToggle}>Sign Up</button>
          </div>

          <br />

           {this.state.menu?  
           <Form onSubmit={() => this.props.fetchUser(this.state.name.toLowerCase(), this.state.password)} v>
          <Form.Field>
            <label>Name:</label>
            <input
              type="text"
              placeholder="name"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
            />
          </Form.Field>
          <Form.Field>
            <label>Password:</label>
            <input
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
            />
          </Form.Field>
          <Button type="submit" fluid><i className="user icon"></i> Login</Button>
        </Form>

        :
        
        <Form onSubmit={() => this.props.handleSignUp(this.state.newName.toLowerCase(), this.state.newPassword)} v>
          <Form.Field>
            <label>Name:</label>
            <input
              type="text"
              placeholder="name"
              value={this.state.newName}
              onChange={this.handleChange}
              name="newName"
            />
          </Form.Field>
          <Form.Field>
            <label>Password:</label>
            <input
              type="password"
              placeholder="password"
              value={this.state.newPassword}
              onChange={this.handleChange}
              name="newPassword"
            />
          </Form.Field>
          <Form.Field>
            <label> Confirm Password:</label>
            <input
              type="password"
              placeholder="password"
              value={this.state.newPassword}
              onChange={this.handleChange}
              name="newPassword"
            />
          </Form.Field>
          <Button type="submit" fluid><i className="user plus icon"></i> Sign Up</Button>
        </Form>
           }
        </div>
        )}
}

export default SignUp