
import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'


export default class LoginPage extends Component{
    constructor() {
        super();
    
        this.state = {
          Email: localStorage.getItem("UserEmailID")      
        };
      }
    render() {
        let userEmail = this.state.Email
        return (
            <>
       
       <nav className="navbar navbar-expand-lg navbar-dark " style={{backgroundColor:"chocolate"}} >
        <a>  <img
                src="https://cdn.imgbin.com/20/14/23/imgbin-daily-expense-manager-expense-management-business-business-SJ4qxfKjHp2UPp5bGrVqUAvJP.jpg"
                height="50px"
                class="card-img-top"
              /></a>
        &emsp;
        <div className="collapse navbar-collapse">
        <div className="navbar-nav me-auto">
        
        <NavLink to="/expanseDashboard">      
        <h1  className="nav-link active" >Add Expenses</h1>
        </NavLink>
        &emsp;

        <NavLink to="/details">
        <h1 className="nav-link active">  Expenses Details</h1>
        </NavLink>
      
        </div>
        
        <h4>&emsp;Welcome {userEmail}</h4>
        <NavLink to="/loginForm">
        <button className=" btn btn-primary" >Logout</button>
        </NavLink>
          
    </div>  
    </nav>
    
            </>
        )
    }

}
// export default class LoginPage extends Component {
//     // constructor() {
//     //     super();
    
//     //     this.state = {
//     //       Email: localStorage.getItem("email")      
//     //     };
//     //   }
    
//     render() {
//         // let userEmail = this.state.Email
//         return (
//             <div>
//                  {/* <h4>&emsp;Welcome {userEmail},</h4> */}
//                 <div>
//                     <center>
//                         <div className="row">


//                             <div className="container mt-5">

//                                 <div className="card col-3 border-primary" style={{ backgroundColor: '#a87771' }}>

//                                     <div className="card-body" >
//                                         <h5 className="card-title" style={{ fontSize: '25px' }} >Expenses</h5>
//                                         <h5 className="card-title" style={{ fontSize: '25px' }} >Monthly Income: 50000</h5>
//                                     </div>
//                                 </div>
//                             </div>


//                             <div className="container mt-5">
//                                 {/* <div className="row"> */}
//                                 <div className="card col-3 border-primary" style={{ backgroundColor: '#a87771' }}>

//                                     <div className="card-body" >
//                                         <h5 className="card-title" style={{ fontSize: '25px' }} >Add Expenses</h5>

//                                         <Link to="/expanseDashboard">
//                                             <button className='btn btn-secondary'>
//                                                 Add Expenses
//                                             </button>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="container mt-5">
//                                 {/* <div className="row"> */}
//                                 <div className="card col-3 border-primary" style={{ backgroundColor: '#a87771' }}>

//                                     <div className="card-body" >
//                                         <h5 className="card-title" style={{ fontSize: '25px' }} >Expenses Details</h5>

//                                         <Link to="/details">
//                                             <button className='btn btn-secondary'>
//                                           Expenses Details
//                                             </button>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>

//                             <Link to="/loginForm">
//                                 <button className='btn btn-info'>
//                                     LogOut
//                                 </button>
//                             </Link>


//                         </div>   </center>
//                 </div >
//             </div>



//         )
//     }
// }
