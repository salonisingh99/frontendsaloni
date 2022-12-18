import React, { Component } from "react";
import Navbar from "./navbar"

export default class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const userId = JSON.parse(window.localStorage.getItem("user"))._id;
    if (userId) {
      fetch(`http://localhost:5000/getAlumini?id=${userId}`, {
        method: "GET",
        crossDomain: true,
      }).then((res) => res.json())
        .then((data) => {
          if (data.status == 200) {
            const items = this.state.items;
            this.setState({ items: [...items, data.data] });
            console.log(this.state.items[0])
            {this.state.items.map((data1)=>{console.log("key",data1)})}
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
            <div className="col-md-6" style={{ margin: "auto", backgroundColor: "white", borderRadius: "6px" }}>
              <form onSubmit={this.handleSubmit} >
                <h3 style={{ paddingTop: "10%" }}>SEND FOLLOW REQUEST TO ALUMINI</h3>
                <hr />
                <div>
                  {this.state.items.length > 0 ? <>
                   {/* {this.state.items.map(([key,value])=>{
                    <div key={key}>
                        {value}
                    </div>
                   })} */}
                   hsdgvfhsdgfhdsg
                  </> : <>
                    No data found
                  </>}
                </div>
                
                <div className="row" style={{ padding: "3%", paddingRight: "0%" }}>
                  <div className="col-md-2">
                    <label>Username</label>
                  </div>
                  <div className="col-md-2">
                    <label>College</label>
                  </div>
                  <div className="col-md-2">
                    <label>Company</label>
                  </div>
                  <div className="col-md-2">
                    <label>Batch</label>
                  </div>
                  <div className="col-md-3">
                    <div className="d-grid">
                      <button type="submit" className="btn" style={{ backgroundColor: "#3DED97", fontWeight: "bold", color: "white" }}>
                        SEND REQUEST
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
