import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

function Login () {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);
//   const navigate = useNavigate();

//   axios.defaults.withCredentials = true;

  const redirect_to_register = async(e) => {
    e.preventDefault() ;
    window.location.href = '/register' ;
  } ;

  const login = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/login", {
        ID: ID,
        password: password,
      })
      .then((response) => {
        if (!response.data.logged_in) {
          console.log(response.data.message);
          setLoggedIn(false);
        } else {
          console.log(response.data.ID);
          window.location.href = '/home';
        }
      });
  };

  useEffect(() => {
    axios.get("http://localhost:8080/login").then((response) => {
        if(response.data.loggedin === true) window.location.href = '/home';
        // console.log(response.message) ;
    });
  }, []);
  
  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
            

              <form onSubmit={login} className="box">
                <p className="has-text-centered">LOGIN</p>
                <div className="field mt-5">
                  <label className="label">ID</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                        // placeholder="ID"
                        // value="text"
                      onChange={(e) => setID(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                        // placeholder="******"
                        // value="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">
                    Login
                  </button>
                </div>
              </form>
              <div>
              { !loggedIn ? <h1>Invalid Credentials</h1> : <h1></h1> }            
              </div>

              <div>
                <div className="field mt-5">
                  <button className="button is-success is-fullwidth" onClick={redirect_to_register}>
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;