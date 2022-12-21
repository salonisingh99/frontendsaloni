import React, { Component } from "react";
import Navbar from "./navbar"

export default class studentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      aluminis:[]
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const userId = JSON.parse(window.localStorage.getItem("user"))?._id;
    if (userId) {
      fetch(`http://localhost:5000/getAlumini?id=${userId}`, {
        method: "GET",
        crossDomain: true,
      }).then((res) => res.json())
        .then((sendReq) => {
          if (sendReq.status == 200) {
            const items = this.state.items;
            this.setState({ items: [...items, sendReq.data] });
          }
        });
        fetch(`http://localhost:5000/connectedAlumini?sendBy=${userId}`, {
        method: "GET",
        crossDomain: true,
      }).then((res) => res.json())
        .then((connectedAlu) => {
          if (connectedAlu.status == 200) {
            const aluminis = this.state.aluminis;
            this.setState({ aluminis: [...aluminis, connectedAlu.data] });
          }
        });
    }
  }

  handleClick = (aluminiId, e) => {
    e.preventDefault()
    const userId = JSON.parse(window.localStorage.getItem("user"))?._id;
    if (userId && aluminiId) {
      fetch("http://localhost:5000/sendRequestToAlumini", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          sendBy: userId,
          sendTo: aluminiId,
          status: "Pending"
        })
      })
        .then((data) => {
          console.log(data)
          if (data.status == 200) {
            console.log("Send request to alumini");
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
                <h3 style={{ paddingTop: "5%" }}>SEND FOLLOW REQUEST TO ALUMINI</h3>
                <hr />
                <div>

                  {this.state.items.length > 0 && this.state.items[0].length > 0 ?
                    <>
                      <div className="row" style={{ padding: "3%",paddingTop:"5px",  paddingRight: "0%", justifyContent: "center" }}>
                        <div className="col-md-2" style={{textAlign:"center"}}>
                          <label>Username</label>
                        </div>
                        <div className="col-md-2" style={{textAlign:"center"}}>
                          <label>College</label>
                        </div>
                        <div className="col-md-2" style={{textAlign:"center"}}>
                          <label>Company</label>
                        </div>
                        <div className="col-md-2" style={{textAlign:"center"}}>
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
                                <div className="col-md-2" style={{textAlign:"center"}}>
                                  <p>{user.username||  "-"}</p>
                                </div>
                                <div className="col-md-2" style={{textAlign:"center"}}>
                                  <p>{user.college||  "-"}</p>
                                </div>
                                <div className="col-md-2" style={{textAlign:"center"}}>
                                  <p>{user.company||  "-"}</p>
                                </div>
                                <div className="col-md-2" style={{textAlign:"center"}}>
                                  <p>{user.batch||  "-"}</p>
                                </div>
                                <div className="col-md-3">
                                  <div className="d-grid">
                                    <button type="submit" className="btn" onClick={(e) => this.handleClick(user._id, e)} style={{ backgroundColor: "#3DED97", fontWeight: "bold", color: "white" }}>
                                      SEND REQUEST
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
                      No data found
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
                <h3 style={{ paddingTop: "5%" }}>ALUMINI DETAILS</h3>
                <hr />
                <div>

                  {this.state.aluminis.length > 0 && this.state.aluminis[0].length > 0 ?
                    <>
                      <div className="row" style={{ padding: "3%", paddingTop:"5px", paddingRight: "0%", justifyContent: "center" }}>
                        <div className="col-md-2" style={{textAlign:"center"}}>
                          <label>Alumini</label>
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
                          <label>Company</label>
                        </div>
                        <div className="col-md-2" style={{textAlign:"center"}}>
                          <label>Batch</label>
                        </div>
                      </div>
                      <div>
                        {this.state.aluminis[0].map((alumini) => {
                          const list = (
                            <>
                              <div className="row" style={{ padding: "3%",paddingTop:"5px",  paddingRight: "0%", justifyContent: "center" }}>
                                <div className="col-md-2" style={{textAlign:"center"}}>
                                  <p>{alumini.username||  "-"}</p>
                                </div>
                                <div className="col-md-2" style={{textAlign:"center"}}>
                                  <p>{alumini.email||  "-"}</p>
                                </div>
                                <div className="col-md-2" style={{textAlign:"center"}}>
                                  <p>{alumini.phone||  "-"}</p>
                                </div>
                                <div className="col-md-2" style={{textAlign:"center"}}>
                                  <p>{alumini.college||  "-"}</p>
                                </div>
                                <div className="col-md-2" style={{textAlign:"center"}}>
                                  <p>{alumini.company||  "-"}</p>
                                </div>
                                <div className="col-md-2" style={{textAlign:"center"}}>
                                  <p>{alumini.batch||  "-"}</p>
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
