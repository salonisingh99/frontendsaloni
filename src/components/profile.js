import React, { Component } from "react";
import Navbar from "./navbar"
let user = JSON.parse(window.localStorage.getItem("user"));

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: user?.phone || "", batch: user?.batch || "", college: user?.college || "", company: user?.company || "", designation: user?.designation || ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { phone, batch, college, company, designation } = this.state;

    fetch("http://localhost:5000/profile", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        _id: user?._id, phone, batch, college, company, designation
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          const userData = {
            _id: user?._id,
            username: user?.username,
            email: user?.email,
            role: user?.role,
            phone: phone,
            batch: batch ,
            college: college,
            company: company ,
            designation: designation,
            profile:"Completed"
          }
          window.localStorage.setItem("user", JSON.stringify(userData));
          if(user.role == "Student"){
            window.location.href = "./student-dashboard";
          }
          if(user.role == "Alumini"){
            window.location.href = "./alumini-dashboard";
          }
        }
      });
  }
  render() {
    return (
      <>
        <Navbar />
        <div className="auth-wrapper">
          <div className="auth-inner-pro">
            <form onSubmit={this.handleSubmit}>
              <h3>Profile</h3>
              <div className="row" style={{ marginBottom: "5px" }}>
                <div className="col-md-6">
                  <label>Username</label>
                  <input
                    className="form-control"
                    value={user?.username || ""}
                    required
                    readonly
                  />
                </div>
                <div className="col-md-6">
                  <label>Email</label>
                  <input
                    className="form-control"
                    name="email"
                    value={user?.email || ""}
                    readonly
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: "5px" }}>
                <div className="col-md-6">
                  <label>Role</label>
                  <input
                    className="form-control"
                    value={user?.role || ""}
                    readonly
                  />
                </div>
                <div className="col-md-6">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Enter Phone"
                    value={this.state.phone}
                    onChange={(e) => this.setState({ phone: e.target.value })}
                    required="true"
                  />
                </div>
              </div>
              <div className="row" style={{ marginBottom: "5px" }}>
                <div className="col-md-6">
                  <label>College</label>
                  <input
                    type="text"
                    name="college"
                    className="form-control"
                    placeholder="Enter college"
                    value={this.state.college}
                    onChange={(e) => this.setState({ college: e.target.value })}
                    required="true"
                  />
                </div>
                <div className="col-md-6">
                  <label>Batch</label>
                  <input
                    type="text"
                    name="batch"
                    className="form-control"
                    placeholder="Enter batch"
                    value={this.state.batch}
                    onChange={(e) => this.setState({ batch: e.target.value })}
                    required="true"
                  />
                </div>
              </div>
              {user.role == "Alumini" &&
                <>
                  <div className="row" style={{ marginBottom: "5px" }}>
                    <div className="col-md-6">
                      <label>Company</label>
                      <input
                        type="text"
                        name="company"
                        className="form-control"
                        placeholder="Enter company"
                        value={this.state.company}
                        onChange={(e) => this.setState({ company: e.target.value })}
                        required={user.role == "Alumini"?"true":"false"}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Designation</label>
                      <input
                        type="text"
                        name="designation"
                        className="form-control"
                        placeholder="Enter designation"
                        value={this.state.designation}
                        onChange={(e) => this.setState({ designation: e.target.value })}
                        required={user.role == "Alumini"?"true":"false"}
                      />
                    </div>
                  </div>
                </>
              }
              <div className="d-grid" style={{ marginTop: "30px" }}>
                <button type="submit" className="btn" style={{ backgroundColor: "#3DED97", fontWeight: "bold", color: "white" }}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

