import React, { Component } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
//import { Axios } from 'axios';
import { Link } from "react-router-dom";
import Axios, * as others from 'axios';


export default class ExpanseDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDailog: false,
            newCat: "",
            amount: "",
            date: "",
            categ: "",
            catList: []
        }
        this.handleAddCategory = this.handleAddCategory.bind(this);
        this.handleAddAmount = this.handleAddAmount.bind(this);
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
                    catList: res
                })
                //catList.push(abc)
                console.log(res);
            });
        console.log(this.state.catList)
    }

    addCategory = () => {
        this.setState({
            showDailog: true
        })

    }

    handleAddCategory(e) {
        this.setState({
            newCat: e.target.value
        })
        console.log(this.state.newCat)
    }

    handlecateg(e) {

        this.setState({
            categ: e.target.value
        })
        console.log(this.state.categ)
    }

    handleAddAmount(e) {
        this.setState({
            amount: e.target.value
        })
        console.log(this.state.amount)
    }

    handleDate(e) {
        this.setState({
            date: e.target.value
        })
        console.log(this.state.date)
    }

    addNewCat = (e) => {
        e.preventDefault();
        debugger
        Axios.post("http://localhost:8000/category", {
            newCatAdded: this.state.newCat,
        }).then((response) => {
            if (response.data.message) {
                this.setState({
                    newCat: "",
                    showDailog: false,
                })
            }
            console.log("data added successfully")

            console.log(response)
        })
        this.categoryList();
    }

    save = (e) => {
        console.log(this.state.categ)
        e.preventDefault();
        Axios.post("http://localhost:8000/saveCat", {
            date: this.state.date,
            amount: this.state.amount,
            categ: this.state.categ,

        }).then((response) => {
            if (response.data.message) {
                this.setState({
                    date: "",
                    amount: "",
                    categ: "",
                })
            }
            console.log("data added successfully")

            console.log(response)
        })
        // this.categoryList();

    }



    render() {
        var displayAdd;
        if (this.state.showDailog) {
            displayAdd =
                <div>
                    {/* <hr /> */}
                    <input type="text" className="form-control col-2" placeholder="Enter New Category"
                        value={this.state.newCat} onChange={this.handleAddCategory} /><br />
                    <br />
                    <button onClick={this.addNewCat}
                    >Add</button>
                </div>
        }



        return (

            <div className="row">
                <div className="col-2">
                    <label style={{ fontSize: "25px" }}>Select Date</label><br />
                    <input type="date" className="form-control" placeholder="dd/mm/yyyy"
                        value={this.state.date} onChange={this.handleDate} />
                </div>

                <div className="col-2">
                    <label style={{ fontSize: "25px" }}>Category</label><br />
                    <div >
                        <select className="input-group" value={this.state.categ} onChange={this.handlecateg} >
                            <option selected>Please Select </option>

                            {this.state.catList.map(ele => (
                                <option>{ele.category}</option>
                            ))}

                        </select><br />

                        <input type="text" className="form-control" placeholder="Enter Amount"
                            value={this.state.amount} onChange={this.handleAddAmount} /><br />
                        <button onClick={this.save}>Save</button>&emsp;&emsp;

                        <Link to="/details">
                            <button type="submit" value="submit">Expense Details</button></Link>
                        <br /><br />
                        {/* <button type="submit" value="submit" onClick={this.addCategory}
                            style={{ position: "absolute", right: "50px", top: "40px" }}
                        >Add New Category</button> */}

                        <button type="submit" value="submit" onClick={this.addCategory}
                        >Add New Category</button><br/><br/>
                        {displayAdd}


                    </div>
                </div>

            </div>


        )
    }
}