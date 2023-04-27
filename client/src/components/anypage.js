import React, { useEffect, useState } from "react";
import axios from "axios";

const AnyPage = () => {

    const [user, setUser] = useState(null) ;

    useEffect(() => {
        axios.get('http://localhost:8080/home').then(res => {
            if(res.data.notlog){
                window.location.href = '/login' ;
            }
            else{
                window.location.href = '/home' ;
            }
        }).catch(err => console.log(err)) ;
    }, []);

    return(
        <div>
            <p>
                Meh, AnyPage here
            </p>
        </div>
    ) ;
} ;

export default AnyPage ;