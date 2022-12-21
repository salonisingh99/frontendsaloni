import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      role:""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password, role } = this.state;
    console.log(email, password, role);
    fetch("http://localhost:5000/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
        role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == 200) {
          alert("login successful");
          const user = {
            _id:data.data._id,
            username:data.data.username,
            email:data.data.email,
            role:data.data.role,
          }
          window.localStorage.setItem("user", JSON.stringify(user));
          if(user.role == "Student"){
            window.location.href = "./profile";
          }
          if(user.role == "Alumini"){
            window.location.href = "./profile";
          }
        }
      });
  }
  render() {
    return (
      <div className="auth-wrapper">  
      <div className="auth-inner">
      <form onSubmit={this.handleSubmit}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
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
          <label>Role</label>
          <select className="form-control" name="role" id="role"  onChange={(e) => this.setState({ role: e.target.value })}  required="true">
            <option value="">Select role...</option>
            <option value="Alumini">Alumini</option>
            <option value="Student">Student</option>
          </select>
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1"  required="true">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn" style={{backgroundColor:"#3DED97",fontWeight:"bold" , color:"white"}}>
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          <a href="/sign-up">Sign Up</a>
        </p>
      </form>
      </div>
      </div>
    );
  }
}
