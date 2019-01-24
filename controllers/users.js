import Joi from 'joi';
import moment from 'moment';
import table from '../database/db.js';
import dotenv from 'dotenv';
import user from '../data/users.js';
import jwt from 'jsonwebtoken';
import key from '../helpers/config';
import some from '../helpers/val';
dotenv.config();


class users{

    static login(req, res){
        const sql = `
        SELECT * FROM user_table
        WHERE username = '${req.body.username}' AND password = '${req.body.password}'
        `;
        table.pool.query(sql)
        .then((resp)=>{
            
            if(resp.rows.length > 0){
                
                const {id, username} = resp.rows[0];
                const load = {
                     id,
                     username
                   };   
            //create a token
              some.sign(req,res,load, 200);      
            }
           else{
            return res.status(401).send({
                status:401,
                error: "Username or Password is Incorrect"
            })
        }
         
        })

        .catch((err)=>{
              return res.send({
                  status:'DB ERROR',
                  error: err.message
              })
        })


    }

    static signup(req, res){

        const newUser =[
            req.body.firstname,
            req.body.lastname,
            req.body.othername,
            req.body.email,
            req.body.phoneNumber,
            moment().format('LL'),
            req.body.password,
            req.body.username,
        ];

        const sql = `
        INSERT INTO user_table(firstname, lastname, othername, email, phoneNumber, registered, password, username)
        VALUES($1,$2, $3, $4, $5, $6, $7, $8)
        RETURNING *
        `;

        table.pool.query(sql, newUser)
        .then((response)=>{
            if(response.rows.length > 0){
                console.log(response.rows[0]);
                const {id, username} = response.rows[0];
                const load = {
                     id,
                     username
                   };    
            //create a token
              some.sign(req,res,load, 200);      
            }
            
        })
        .catch((error)=>{
            return res.status(400).send({
                status:400,
                error: error.message
            })
        })

        }




      static commenting(req, res){

        const sql = `
        SELECT * FROM meetupQuestions
        WHERE id = '${req.params.questionID}'
        `;

        const sql1 = `
        INSERT INTO comments(comment, user_id, question_id, happenedon)
        VALUES($1, $2, $3, $4)
        RETURNING *
        `;

        table.pool.query(sql)
        .then((response)=>{
            console.log(req.params.questionID);
            console.log(response.rows);
            if (response.rows.length > 0 ){
                console.log('here...')
               table.pool.query(sql1,[req.body.comment, 3, req.params.questionID, moment().format('LL')])
               .then((resp)=>{
                   return res.status(201).send({
                       status:201,
                       data: {
                           question: response.rows[0].id,
                           title: response.rows[0].title,
                           body: response.rows[0].body,
                           comments: resp.rows[0].comment
                       }
                   })
               })
               .catch((err)=>{
                   return res.send({
                       status:"INSERTING COMMENT ERROR",
                       error: err.message
                   })
               })
            }
            else{
                return res.status(404).send({
                    status:404,
                    error:" Question with such ID can not be found..."
                })
            }
        })
        .then((error)=>{
            return res.send({
                status:"DB ERROR",
                error: error.message
            })
        })

      }

}



export default users;