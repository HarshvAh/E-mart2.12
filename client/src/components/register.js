import React, { useEffect, useState } from "react";
import axios from "axios";

const Register = () => {

    const [User_ID, setUID] = useState("") ;
    const [password, setPassword] = useState("") ;
    const [User_type, setUtype] = useState("") ;
    const [registerable, setRegisterable] = useState(false) ;
    // const [registered, setRegistered] = useState(false) ;
    const [UID_is_null, set_UID_is_null] = useState(false) ;
    const [UID_exists, set_UID_exists] = useState(false) ;
    const [pass_is_null, set_pass_is_null] = useState(false) ;
    const [Utype_is_null, set_Utype_is_null] = useState(false) ;


    const check_registerable = async(e) => {
        e.preventDefault() ;
        axios.post("http://localhost:8080/register",{
            User_ID: User_ID,
            password: password,
            User_type: User_type,
            registerable : registerable
        }).then((response) => {
            if(response.data.registerable){
                setRegisterable(true) ;
                set_UID_is_null(false) ;
                set_UID_exists(false) ;
                set_pass_is_null(false) ;
                set_Utype_is_null(false) ;
            } else {
                setRegisterable(false) ;
                if(response.data.UID_is_null){
                    set_UID_is_null(true) ;
                } else if (response.data.pass_is_null){
                    set_pass_is_null(true) ;
                } else if (response.data.UID_exists) {
                    set_UID_exists(true) ;
                } else if (response.data.Utype_is_null) {
                    set_Utype_is_null(true) ;
                }
            }
        }) ;
    }

    const check_registered = async(e) => {
        e.preventDefault() ;
        if(User_type === 'Buyer'){
            axios.post("http://localhost:8080/register",{
                registerable : registerable,
                User_type : User_type,
            })
        }
    }
    

    useEffect(() => {
        axios.get('http://localhost:8080/register').then(res => {
            if(res.data.registerable){
                setRegisterable(true) ;
                setUID(res.data.UID) ;
                setPassword(res.data.password) ;
                setUtype(res.data.Utype) ;
            } else if (res.data.registered){

            }
        }).catch(err => console.log(err)) ;
    }, []);

    return (
        <div>

            {/* {!registerable ? 
                <form onSubmit={check_registerable} className="box">
                    <p className="has-text-centered">REGISTER</p>

                    <div>
                        <label classname="label">Enter User ID</label>
                        <div>
                            <input
                                type = 'text'
                                classname="input"
                                onChange={(e) => setUID(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        {UID_is_null ? <p>User ID cannot be empty</p> : <p></p>}
                        {UID_exists ? <p>User ID exists, pick a new User ID</p> : <p></p>}
                    </div>

                    <div>
                        <label classname="label">Enter Password</label>
                        <div>
                            <input
                                type = 'text'
                                classname="input"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        {pass_is_null ? <p>Password cannot be empty</p> :<p></p>}
                    </div>

                    <div>
                        <label classname="label">Select User Type</label>
                        <select value={User_type} onChange={(e) => setUtype(e.target.value)}>
                            <option value="Buyer">Buyer</option>
                            <option value="Seller">Buyer</option>
                            <option value="Agent">Delivery Agent</option>
                        </select>
                    </div>
                    <div>
                        {Utype_is_null ? <p>Choose a user type</p> :<p></p>}
                    </div>
                </form>
            : 
                !registered ?
                    <form>
                    </form>
                :

                
            } */}
        </div>
    ) ;

} ;

export default Register ;