import React, { Component } from "react";
import Axios, * as others from 'axios';
class ExpenseDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // details: [],
            selectMonth: false,
            showTable: false,
            onButtonClick: false,
            clickMonth: "",
            month: ["01", "02","03","04", "05","06","07","08","09","10", "11", "12"],
            dataList: [],
        };

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    

    displayMonthlyData = (e) => {
        e.preventDefault();
        console.log(this.state.clickMonth)
        Axios.post("http://localhost:8000/monthData", {

            clickMonth: this.state.clickMonth,
        }).then((response) => {
            if (response.data.message) {
                this.setState({
                    // loginFail: true,
                    // email: "",
                    // password: ""
                     dataList: response,
                })
            }
            else {
                this.setState({

                    // dataList: response,
                    showTable: true,
                })
            }
            console.log(response);
            console.log(this.state.dataList);
        })
         this.tableDataDisplay();
    }

    async componentDidMount() {
        this.tableDataDisplay();
        //debugger        
    }

    async tableDataDisplay() {
        const response = await fetch("http://localhost:8000/monthWiseData")
            .then(res => res.json())

            .then(res => {
                this.setState({
                    dataList: res
                })
                //catList.push(abc)
                 console.log(this.state.dataList);
            });
        console.log(this.state.dataList)
    }


    handleDropdownChange(e) {
        this.setState({
            clickMonth: e.target.value,
            //showTable: true,
        })
        console.log(this.state.clickMonth)
    }

    onButtonClick = () => {
        this.setState({
            selectMonth: true
        })
    }

    render() {
        var display;
        var displyTable;
        if (this.state.selectMonth) {
            display =
                <div>
                    <select onChange={this.handleDropdownChange} value={this.state.clickMonth}>
                        <option selected>Please Select </option>
                        {this.state.month.map(ele => (
                            <option>{ele}</option>
                        ))}
                    </select>

                    <button onClick={this.displayMonthlyData}>Display Monthly Data</button>
                </div>
        }

        if (this.state.showTable) {
            displyTable =
                <div>
                    <a href="expanseDashboard" className="offset-md-11">Back</a>

                    <div style={{ fontFamily: 'Fraktur', backgroundColor: "#85C1E9" }}>
                        <center>
                            <h1>Expense Details</h1>
                        </center>
                    </div>
                    <br></br>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>&emsp;&emsp;Id</th>
                                    <th> Date</th>
                                    <th> Category</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.dataList.map((monthData) => (
                                    <tr key={monthData.Id}>
                                        <td>&emsp;&emsp;{monthData.Id}</td>
                                        <td>&emsp;&emsp;{monthData.date}</td>
                                        <td>&emsp;&emsp;{monthData.category}</td>
                                        <td>&emsp;&emsp;{monthData.amount}</td>
                                    </tr>
                                ))}
                                ))
                            </tbody>
                        </table>
                    </div>
                </div>

        }

        return (

            <div>
                
                        <button>Weekly</button>
                  
                        <button onClick={this.onButtonClick}>Monthly</button>
                    

                {display}

                {displyTable}

            </div >



        )
    }
}

export default ExpenseDetails;
