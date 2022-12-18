import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      role:"",
      password: "",
      cpassword: "",
      error:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, email, role, password , cpassword} = this.state;
    console.log(username, email, role, password);
    if(password && password !== cpassword){
      this.setState({ error:"Password & Confirm password does not match."})
    }else{
      this.setState({ error:""})
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username, email, role, password
        }),
      })
        .then((data) => {
          console.log(data)
          if(data.status == 400){
            this.setState({ error:data.message})
          }
          if(data.status == 200) {
            alert("Register successful");
            window.location.href = "./sign-in";
          } 
        });
    }
  }
  render() {
    return (
      <div className="auth-wrapper">  
      <div className="auth-inner">
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>
        <h6 style={{margin:"3px", color:"red"}}>
          {this.state.error}
        </h6>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Enter username"
            onChange={(e) => this.setState({ username: e.target.value })}
            required="true"
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
            required="true"
          />
        </div>

        <div className="mb-3">
          <label>Role</label>
          <select className="form-control" name="role" id="role"  onChange={(e) => this.setState({ role: e.target.value })}  required="true">
            <option value="">Select role...</option>
            <option value="Alumini">Alumini</option>
            <option value="Student">Student</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
            required="true"
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            className="form-control"
            placeholder="Enter confirm password"
            onChange={(e) => this.setState({cpassword: e.target.value })}
            required="true"
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn" style={{backgroundColor:"#3DED97",fontWeight:"bold" , color:"white"}}>
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
      </div>
      </div>
    );
  }
}
