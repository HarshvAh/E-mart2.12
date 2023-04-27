import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Home = () => {

    const [user, setUser] = useState(null) ;
    const [loading, setLoading] = useState(true) ;

    useEffect(() => {
        axios.get('http://localhost:8080/home').then(res => {
            if(res.data.notlog){
                window.location.href = '/login' ;
            } else {
                setUser(res.data.user) ;
                // if(res.data.user){
                //     console.log("Present") ;
                // } else {
                //     console.log("Absent") ;
                // }
                setLoading(false) ;
            }
        }).catch(err => console.log(err)) ;
    }, []);
    if(loading){
        return <></> ;
    }
    else{
        return (
            <div>
                <p>Yay, Logged in to home with user = {user} </p> {/*gives null until we fill in some data into the dataset*/}
            </div>
        );
    }

} ;
export default Home ;