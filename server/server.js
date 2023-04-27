// var http = require("http");
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const cors = require("cors");
const app = express();
const secret_key = require('./Controllers/auth.config.js');
const auth_session = require('./Controllers/auth_session.js');
const db = require('./config.txt');
const port = 8080;

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(session({
  secret: secret_key.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  },
}));

const { Client } = require('pg');
const client = new Client({
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database,
    multipleStatements: true
});
try{
  client.connect();
}
catch(error){
  console.log(error);
}


app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  });

app.get('/login', (request, response) => {
  if(request.session.user) {
    response.send({loggedin: true, user: request.session.user});
    console.log(request.session.user);
  }
  else response.send({loggedin: false});
});

app.post('/login', async (request, response) => {
  const ID = request.body.ID;
  const password = request.body.password;

  try {
    const query_valid_user = `SELECT * FROM login WHERE user_id = '${ID}'`;
    let result_valid_user = await client.query(query_valid_user);

    const query_buyer = `SELECT user_id FROM buyer_profile`;
    let result_buyer = await client.query(query_buyer);

    const query_seller = `SELECT user_id FROM seller_profile`;
    let result_seller = await client.query(query_seller);

    const query_agent = `SELECT user_id FROM delivery_agent`;
    let result_agent = await client.query(query_agent);

    if (result_valid_user.rows.length > 0) { 
      // const valid_user = bcrypt.compareSync(password, result_valid_user.rows[0].hashed_password);
      const valid_user = (password == result_valid_user.rows[0].hashed_password) ;
      if(valid_user){
          console.log("log in success");
          let user = "";
          for(let i=0;i<result_buyer.rows.length;i=i+1){
            if(result_buyer.rows[i].user_id == ID){
              user = "buyer";
              break;
            }
          }
          for(let i=0;i<result_seller.rows.length;i=i+1){
            if(result_seller.rows[i].user_id == ID){
              user = "seller";
              break;
            }
          }
          for(let i=0;i<result_agent.rows.length;i=i+1){
            if(result_agent.rows[i].user_id == ID){
              user = "agent";
              break;
            }
          }
          request.session.user = result_valid_user.rows[0].user_id;
          console.log(user);
          response.send({
          logged_in: true,
          ID: ID,
          user: user,
          });
      }
      else {
        response.send({logged_in: false, message: 'Incorrect password',});
        console.log(result_valid_user,password,valid_user) ;
      }
    }
    else response.send({logged_in: false, message: 'Invalid user',})
  }
  catch (err) {
    console.error(err);
  }
});

app.post('/logout', auth_session, (request, response) => {
  request.session.destroy(err => {
      if(err) response.send({notlog: false, message: 'Unable to Log Out',});
      else response.send({notlog: true, message: 'Logged Out',});
    });
});

app.get('/home', auth_session, async (request, response) => {
  // console.log(request.session.user);
  const id = request.session.user;
  let found = false ;
  
  try {
    const query_buyer = `SELECT * FROM buyer_profile WHERE user_id = '${id}'` ;
    let result_buyer = await client.query(query_buyer) ;
    const buyer = result_buyer.rows[0] ;
    response.send({user : buyer}) ;
    found = true ;
  } catch (err) {
    console.log(err) ;
  }

  if(!found){
    console.log('still trying') ;
    try {
      const query_seller = `SELECT * FROM seller_profile WHERE user_id = '${id}'` ;
      let result_seller = await client.query(query_seller) ;
      const seller = result_seller.rows[0] ;
      response.send({user : seller}) ;
      found = true ;
      console.log('seller found') ;
    } catch (err) {
      console.log(err) ;
    }

  }

  if(!found){

    try {
      const query_agent = `SELECT * FROM delivery_agent WHERE user_id = '${id}'` ;
      let result_agent = await client.query(query_agent) ;
      const agent = result_agent.rows[0] ;
      response.send({user : agent}) ;
      found = true ;
      console.log('agent found') ;
    } catch (err) {
      console.log(err) ;
    }

  }

  if(!found){
    response.send({notlog:true}) ;
    console.log('none found') ;
  }
});

app.post('/register',async (request,response) => {
  const registerable = request.body.registerable ;
  if(!registerable){
    const User_ID = request.body.User_ID ;
    const password = request.body.password ;
    const User_type = request.body.User_type ;
    if (!User_ID){
      response.send({UID_is_null:true}) ;
    } else if (!password){
      response.send({pass_is_null : true}) ;
    } else if (User_type!=='Buyer' && User_type!=='Seller' && User_type!=='Agent'){
      response.send({Utype_is_null : true}) ;
    }
    else {
      try {
        const query = `SELECT * FROM login WHERE user_id = '${ID}'` ;
        let result = await client.query(query) ;
        if(result.rows.length>0){
          response.send({UID_exists : true}) ;
        } else {
          response.send({registerable : true, User_ID:User_ID, password : password, User_type : User_type})
          console.log("registerable for : ",User_ID,password,User_type) ;
        }
      } catch (err){console.log(err) ;}
    }
  } else { // Now the person is registerable
    const User_type = request.body.User_type ;
    if(User_type == 'Buyer'){ // TODO
      console.log("registering for Buyer") ;
    } else if (User_type == 'Seller'){ // TODO
      console.log("registering for Seller") ;
    } else if (User_type == 'Agent'){ //TODO
      console.log("registering for Agent") ;
    } else {
      console.log("Invalid Utype with Utype = ",User_type) ;
    }
  }
})