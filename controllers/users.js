import Joi from 'joi';
import moment from 'moment';
import table from '../database/db.js';
import dotenv from 'dotenv';
import user from '../data/users.js';
import jwt from 'jsonwebtoken';
import key from '../helpers/config';
dotenv.config();


class users{

    static login(req, res){
        const sql = `
        SELECT * FROM user_table
        WHERE username = '${req.body.username}' AND password = '${req.body.password}'
        `;
        table.pool.query(sql)
        .then((ress)=>{
            if(ress.rows.length > 0){
               
                jwt.sign(ress.rows[0], key.secret,(err, token)=>{
                    if(token){
                      return res.status(200).send({
                          status:200,
                          data:"Login Successfull",
                          token: token
                 });
                }
                else{
                    return res.send({
                        status:"TOKEN ERROR",
                        error : err.message,
                     });
                }
            })
            }
           else{
            return res.status(400).send({
                status:400,
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
}

export default users;