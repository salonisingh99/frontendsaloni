import React, { Component } from "react";
import Navbar from "./navbar"

export default class aluminiDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      students:[]
    };
    this.handleClickAccept = this.handleClickAccept.bind(this);
    this.handleClickDelete= this.handleClickDelete.bind(this);
  }

  componentDidMount() {
    const userId = JSON.parse(window.localStorage.getItem("user"))?._id;
    if (userId) {
      fetch(`http://localhost:5000/getRequest?id=${userId}`, {
        method: "GET",
        crossDomain: true,
      }).then((res) => res.json())
        .then((getReqData) => {
          if (getReqData.status == 200) {
            const items = this.state.items;
            this.setState({ items: [...items, getReqData.data] });
            console.log(this.state.items)
          }
        });
        fetch(`http://localhost:5000/connectedStudent?sendTo=${userId}`, {
        method: "GET",
        crossDomain: true,
      }).then((res) => res.json())
        .then((connectedStu) => {
          if (connectedStu.status == 200) {
            const students = this.state.students;
            this.setState({ students: [...students, connectedStu.data] });
          }
        });
    }
  }

  handleClickAccept = (studentId, e) => {
    e.preventDefault()
    const userId = JSON.parse(window.localStorage.getItem("user"))?._id;
    if (userId && studentId) {
      fetch("http://localhost:5000/requestAcceptOrDelete", {
        method: "PUT",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          sendBy: studentId,
          sendTo: userId,
          status: "Accept"
        })
      })
        .then((data) => {
          console.log(data)
          if (data.status == 200) {
            console.log(data)
            alert("Request accept successfully")
          }
        });
    }
  }

  handleClickDelete = (studentId, e) => {
    e.preventDefault()
    const userId = JSON.parse(window.localStorage.getItem("user"))?._id;
    if (userId && studentId) {
      fetch("http://localhost:5000/requestAcceptOrDelete", {
        method: "PUT",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          sendBy: studentId,
          sendTo: userId,
          status: "Delete"
        })
      })
        .then((data) => {
          console.log(data)
          if (data.status == 200) {
            alert(data.message)
          }
        });
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="auth-wrapper" style={{ background: "#000000d7" }}>
          <div className="row" style={{ display: "flex", marginTop: "5%", marginBottom: "5%" }}>
            <div className="col-md-6" style={{ margin: "auto", backgroundColor: "white", borderRadius: "6px",width:"70%" }}>
              <form>
                <h3 style={{ paddingTop: "5%" }}>FOLLOW REQUEST FROM STUDENTS</h3>
                <hr />
                <div>

                  {this.state.items.length > 0 && this.state.items[0].length > 0 ?
                    <>
                      <div className="row" style={{ padding: "3%",paddingTop:"5px",  paddingRight: "0%", justifyContent: "center" }}>
                        <div className="col-md-3">
                          <label>Username</label>
                        </div>
                        <div className="col-md-3">
                          <label>College</label>
                        </div>
                        <div className="col-md-3">
                          <label>Batch</label>
                        </div>
                        <div className="col-md-3">
                          <label>Actions</label>
                        </div>
                      </div>
                      <div>
                        {this.state.items[0].map((user) => {
                          const list = (
                            <>
                              <div className="row" style={{ padding: "3%", paddingRight: "0%", justifyContent: "center" }}>
                                <div className="col-md-3">
                                  <p>{user.username||  "-"}</p>
                                </div>
                                <div className="col-md-3">
                                  <p>{user.college||  "-"}</p>
                                </div>
                                <div className="col-md-3">
                                  <p>{user.batch||  "-"}</p>
                                </div>
                                <div className="col-md-3" style={{display:"flex"}}>
                                  <div className="d-grid">
                                    <button type="submit" className="btn" onClick={(e) => this.handleClickAccept(user._id, e)} style={{ backgroundColor: "#3DED97", fontWeight: "bold", color: "white",marginRight:"2px" }}>
                                      ACCEPT
                                    </button>
                                  </div>
                                  <div className="d-grid">
                                    <button type="submit" className="btn" onClick={(e) => this.handleClickDelete(user._id, e)} style={{ backgroundColor: "gray", fontWeight: "bold", color: "white", marginLeft:"2px"}}>
                                      DELETE
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                          return list;
                        })}
                      </div>
                    </>
                    :
                    <div style={{ textAlign: "center", padding: "3%",paddingTop:"5px",  paddingRight: "0%", color: "#c70e0e", fontWeight: "bold" }}>
                      No request data found
                    </div>}
                </div>
              </form>
            </div>
          </div>
        </div >
        <div className="auth-wrapper" style={{ background: "#000000d7" }}>
          <div className="row" style={{ display: "flex", marginTop: "5%", marginBottom: "5%" }}>
            <div className="col-md-6" style={{ margin: "auto", backgroundColor: "white", borderRadius: "6px", width:"70%" }}>
              <form>
                <h3 style={{ paddingTop: "5%" }}>FOLLOWER DETAILS</h3>
                <hr />
                <div>

                  {this.state.students.length > 0 && this.state.students[0].length > 0 ?
                    <>
                      <div className="row" style={{ padding: "3%", paddingTop:"5px", paddingRight: "0%", justifyContent: "center" }}>
                        <div className="col-md-2" style={{textAlign:"center"}}>
                          <label>Student</label>
                        </div>
                        <div className="col-md-2" style={{textAlign:"center"}}>
                          <label>Email</label>
                        </div>
                        <div className="col-md-2" style={{textAlign:"center"}}>
                          <label>Phone</label>
                        </div>
                        <div className="col-md-2" style={{textAlign:"center"}}>
                          <label>College</label>
                        </div>
                        <div className="col-md-2" style={{textAlign:"center"}}>
                          <label>Batch</label>
                        </div>
                      </div>
                      <div>
                        {this.state.students[0].map((student) => {
                          const list = (
                            <>
                              <div className="row" style={{ padding: "3%",paddingTop:"5px",  paddingRight: "0%", justifyContent: "center" }}>
                                <div className="col-md-2" style={{textAlign:"center"}}>
                                  <p>{student.username||  "-"}</p>
                                </div>
                                <div className="col-md-2" style={{textAlign:"center"}}>
                                  <p>{student.email||  "-"}</p>
                                </div>
                                <div className="col-md-2" style={{textAlign:"center"}}>
                                  <p>{student.phone||  "-"}</p>
                                </div>
                                <div className="col-md-2" style={{textAlign:"center"}}>
                                  <p>{student.college ||  "-"||  "-"}</p>
                                </div>
                                <div className="col-md-2" style={{textAlign:"center"}}>
                                  <p>{student.batch||  "-"}</p>
                                </div>
                              </div>
                            </>
                          );
                          return list;
                        })}
                      </div>
                    </>
                    :
                    <div style={{ textAlign: "center", padding: "3%", paddingRight: "0%", color: "#c70e0e", fontWeight: "bold" }}>
                      No data found
                    </div>}
                </div>
              </form>
            </div>
          </div>
        </div >
      </div >
    );

  }
}
