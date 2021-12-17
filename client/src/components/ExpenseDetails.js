import React, { Component } from "react";
import Axios, * as others from 'axios';
import LoginPage from './LoginPage';

class ExpenseDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // details: [],
            selectMonth: false,
            selectWeekStartDate: false,
            showTable: false,
            onButtonClick: false,
            clickMonth: "",
            date: '',
            month: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            dataList: [],
            category: [],
            selectedCategory: '',
            startDate: '',
            endDate: ''
        };

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handlecateg = this.handlecateg.bind(this);

    }
    async componentDidMount() {
        this.categoryList();
        //debugger        
    }

    async categoryList() {
        const response = await fetch("http://localhost:8000/cate")
            .then(res => res.json())

            .then(res => {
                this.setState({
                    category: res
                })
                //catList.push(abc)
                console.log(res);
            });
        console.log(this.state.category)
    }

    displayWeeklyData = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:8000/weekData", {
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            selectedCategory: this.state.selectedCategory,
        }).then((response) => {
            console.log(response)
            if (response.data) {
                this.setState({
                    // loginFail: true,
                    showTable: true,
                    dataList: response.data,
                })
                console.log(this.state.dataList);
            }
            else {

            }
            console.log('data added');
        })

    }

    displayMonthlyData = (e) => {
        e.preventDefault();
        console.log(this.state.selectedCategory)
        Axios.post("http://localhost:8000/monthData", {

            clickMonth: this.state.clickMonth,
            selectedCategory: this.state.selectedCategory,
        }).then((response) => {
            console.log(response)
            if (response.data) {
                this.setState({
                  
                    showTable: true,
                    dataList: response.data,
                })
                console.log(this.state.dataList);
            }
            else {
                // this.setState({
                //     dataList: response,
                //     // dataList: response,
                //     showTable: true,
                // })
            }
            console.log('data added');
            //console.log(this.state.dataList);
        })
        //  this.tableDataDisplay();
    }

    // async componentDidMount() {
    //     this.tableDataDisplay();
    //     //debugger        
    // }

    async tableDataDisplay() {

        const response = await fetch("http://localhost:8000/monthData")
            .then(res => res.json())

            .then(res => {
                console.log(res)
                this.setState({
                    dataList: res
                })
                //catList.push(abc)
                console.log(res);
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
            selectMonth: true,
            selectWeekStartDate: false,
            showTable: false
        })
    }

    onWeeklyButtonClick = () => {
        this.setState({
            selectWeekStartDate: true,
            selectMonth: false,
            showTable: false
        })
    }
    handlecateg(e) {

        this.setState({
            selectedCategory: e.target.value
        })
        console.log(this.state.selectedCategory)
    }
    
    handleDate(e) {
        var newDate = e.target.value
        var dt = newDate.toString();
        console.log(newDate)
        var month = dt.substring(5, 7)
        var year = dt.substring(0, 4)
        console.log(month, year)
        var startDate = dt.slice(-2)
        console.log(startDate)
        var endDate = eval(parseInt(startDate)) + eval(7)
        var weekEndDate = new Date(year, month - 1, endDate)
        var check = weekEndDate.toDateString()
        var date = new Date(check);
        var endDateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
        console.log(endDate, check, endDateString)
        this.setState({
            //date: e.target.value,
            startDate: newDate,
            endDate: endDateString
        })
        console.log(this.state.startDate, this.state.endDate)
    }

    render() {

        var display;
        var displayWeek;
        var displyTable;

        if (this.state.selectMonth) {
            display =
                <div>   &emsp;&emsp;&emsp;

                    <label style={{ fontSize: "35px" }}>Select Category &emsp;Select Month </label><br />
                    &emsp;&emsp;&emsp;&emsp;
                    <select value={this.state.selectedCategory} onChange={this.handlecateg} style={{ fontSize: "20px" }}>
                        <option selected>Please Select </option>
                        {this.state.category.map(ele => (
                            <option>{ele.category}</option>
                        ))}
                    </select>

                    &emsp;&emsp;&emsp;&emsp;   &emsp;&emsp;&emsp;&emsp;   &emsp;
                    <select onChange={this.handleDropdownChange} value={this.state.clickMonth} style={{ fontSize: "20px" }}>
                        <option selected>Please Select </option>
                        {this.state.month.map(ele => (
                            <option>{ele}</option>
                        ))}
                    </select>

                    <br /><br />
                    <button onClick={this.displayMonthlyData} style={{ backgroundColor: 'lightblue', marginLeft: '200px' }}>Display Monthly Data</button>
                    <br /><br />
                </div>
        }
        if (this.state.selectWeekStartDate) {
            displayWeek = <div>&emsp;&emsp;&emsp;
                <label style={{ fontSize: "35px" }}>Select Category  &emsp; Select Week Date </label><br />&emsp;&emsp;&emsp;

              
                <select value={this.state.selectedCategory} onChange={this.handlecateg} style={{ fontSize: "20px" }} >
                    <option selected>Please Select </option>
                    {this.state.category.map(ele => (
                        <option>{ele.category}</option>
                    ))}
                </select>
                &emsp;&emsp;&emsp;&emsp;   &emsp;&emsp;&emsp;&emsp;   &emsp;&emsp;
                <input type="date" placeholder="dd/mm/yyyy"
                    value={this.state.newDate} onChange={this.handleDate} />&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <br /><br />
                <button onClick={this.displayWeeklyData} style={{ backgroundColor: 'lightblue', marginLeft: '200px' }}>
                    Display Weekly Data</button><br/><br/>
            </div>
        }


        if (this.state.showTable) {
            displyTable =
                <div>
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


              <LoginPage/>
                <div className="container row mt-3">
                    <div className="card col-3 border-primary" style={{ backgroundColor: '#a87771' }}>
                        <div className="card-body" style={{ textAlign: 'center' }} >
                            <button onClick={this.onWeeklyButtonClick} className="btn btn-success">Weekly Expenses</button>
                        </div>
                    </div>
                    {/* </div> */}
                    &emsp;&emsp;&emsp;&emsp;
                    &emsp;&emsp;&emsp;&emsp;
                    {/* <div className="container mt-5"> */}
                    <div className="card col-3 border-primary" style={{ backgroundColor: '#a87771' }}>
                        <div className="card-body" style={{ textAlign: 'center' }} >
                            <button onClick={this.onButtonClick} className="btn btn-success">Monthly Expenses</button>
                        </div>
                    </div>
                </div>


                {display}
                {displayWeek}
                {displyTable}

            </div >



        )
    }
}

export default ExpenseDetails;