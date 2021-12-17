import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Axios from 'axios';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loggedin: false,
            loginFail: false,
        };
        this.login = this.login.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    login = (e) => {
        e.preventDefault();
        console.log(this.state.email, this.state.password)
        Axios.post("http://localhost:8000/login", {

            email: this.state.email,
            password: this.state.password,

        }).then((response) => {
            if (response.data.message) {
                this.setState({
                    loginFail: true,
                    email: "",
                    password: ""
                })
            }
            else {
                this.setState({
                    loggedin: true
                })
                localStorage.setItem("UserEmailID", this.state.email)
            }
            console.log(response);
        })

    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        })
        console.log(this.state.email)
    }
    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
        console.log(this.state.password)
    }

    render() {
        var loginStatus;
        if (this.state.loggedin) {
            return <Redirect to="/loginPage" />

        }
        if (this.state.loginFail) {
            loginStatus = <h3 style={{ color: "red" }}>"Invalid login!!!"</h3>
        }
        return (
            <React.Fragment>
                <div>
                    <form>
                        <center>
                            <div className="container mt-4">

                                <h1>Expense Management System</h1>
                                <div id="div1" className="container mt-4">
                                    <h1>Sign Up</h1>
                                    <hr className="divider col-5" />
                                    <div>
                                        
                                    </div>
                                    <div className="form-group col-5" className='div2'>
                                        <label>Email-Id</label>
                                        <div className="input-group">
                                            <span className="input-group-text"></span>
                                            <input type="email" className="form-control"
                                                value={this.state.email}
                                                onChange={this.handleEmailChange}
                                                placeholder="Enter your Email-Id" />
                                        </div>
                                    </div>

                                    <div className="form-group col-5"className='div2'>
                                        <label>Password</label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                            </span>
                                            <input type="password" className="form-control"
                                                value={this.state.password}
                                                onChange={this.handlePasswordChange}
                                                placeholder="Enter your Password" />
                                        </div>
                                    </div><br />
                                
                                    <button type="submit" value="submit" style={{width:'500px'}} className='btn btn-primary' 
                                        onClick={this.login}>Login</button>
                            
                                    
                                    {loginStatus}
                                </div>   
                            </div>
                            <div ></div>
                        </center>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}