

import React, { Component } from 'react'
import { TextField } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import { Autocomplete } from "@autocomplete/material-ui";
import 'react-datepicker/dist/react-datepicker.css'
//import { Axios } from 'axios';
import Axios, * as others from 'axios';


export default class ExpanseDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDailog: false,
            newCat: "",
            catList: []
        }
        this.handleAddCategory = this.handleAddCategory.bind(this);

        // this.state = this.initialState;

        // this.state = {
        //     selectDate: new Date()
        // };
        // this.handleDateChange = this.handleDateChange.bind(this);
    }

    // handleDateChange(newValue) {
    //     debugger
    //     this.setState({
    //         selectDate: newValue
    //     });
    //     console.log(this.state.selectDate)

    // }


    async componentDidMount() {
        this.categoryList();
        //debugger        
    }
    async categoryList(){
        const response = await fetch("http://localhost:8000/")
            .then(res => res.json())
            //     .then(catList => {
            //     this.setState({ catList });
            //   })
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




    render() {
        var displayAdd;
        if (this.state.showDailog) {
            displayAdd =
                <div> <hr />
                    <input type="text" className="form-control" placeholder="Enter New Category"
                        value={this.state.newCat} onChange={this.handleAddCategory} /><br />
                    {/* <input type="number" className="form-control" placeholder="Enter Amount" /><br /> */}
                    <button onClick={this.addNewCat}>Add</button>
                </div>
        }

        return (

            <div className="row">
                <div className="col-2">
                    <label style={{ fontSize: "25px" }}>Select Date</label><br />
                    <input type="date" className="form-control" placeholder="dd/mm/yyyy" />
                </div>

                <div className="col-2">
                    <label style={{ fontSize: "25px" }}>Category</label><br />
                    <div >
                        {/* <input type="text" className="form-control" /> */}
                        {/* <span className="input-group-text dropdown-toogle" /> */}
                        <select className="input-group" >
                            <option selected disabled>Please Select </option>
                            {this.state.catList.map(ele => (
                                <option >{ele.category}</option>
                            ))}


                        </select><br />
                        <button type="submit" value="submit" onClick={this.addCategory}
                        >Add New Category</button>
                        {displayAdd}
                    </div>
                </div>

            </div>


        )
    }
}