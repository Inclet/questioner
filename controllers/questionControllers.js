import meetupQuestions from '../data/meetupQuestions';
import Joi from 'joi';
import moment from 'moment';
import user from '../data/users';
import table from '../database/db.js';


class questions{

      static upvoteQuestion(req, res){

        if(isNaN(req.params.id))
		return res.status(400).send({
			status:400,
			error: "Invalid ID. ID must be a number."
        })
        
         const sql =`
         SELECT * FROM meetupQuestions
         WHERE id = '${req.params.id}'
         `;


         table.pool.query(sql)
         .then((resp)=>{
             if(resp.rows.length > 0){
                const sql1=`
                  SELECT meetupQuestions.createdby, questionState.action
                  FROM meetupQuestions
                  INNER JOIN questionState ON meetupQuestions.id = questionState.question_id
                  `;

                table.pool.query(sql1)
                .then((response)=>{
                    if(response.rows.length > 0 && response.rows[0].action === 'downvote'){
                              // when a user has upvoted before
                           const sql2 =`
                                UPDATE meetupquestions
                                SET upvotes = upvotes +1
                                WHERE id = '${resp.rows[0].id}'
                                RETURNING *
                            `;
                            const sql3 =`
                               UPDATE meetupquestions
                               SET downvotes = downvotes -1
                               WHERE id = '${resp.rows[0].id}'
                               RETURNING *
                          `;

                          const sql4=`
                               UPDATE questionState
                               SET action = 'upvote'
                               WHERE user_id = '${resp.rows[0].id}'
                               RETURNING *
                        `;
                        table.pool.query(sql2);
                        table.pool.query(sql3);
                        table.pool.query(sql4);
                        const {meetup, title, body, upvotes, downvotes} = resp.rows[0];
                        return res.status(201).send({
                            status:201,
                            data:[{
                                meetup,
                                title,
                                body,
                                upvotes:upvotes+1,
                                downvotes: downvotes-1
                            }]
                        })
                        
                    
                    }
                    if(response.rows.length > 0 && response.rows[0].action === 'upvote'){
                        
                        return res.status(403).send({
                            status:403,
                            error:"You are not allowed to upvote 2 times."
                        })
                    }
                    else{         // when a user has not done anything

                        const sql2 =`
                                UPDATE meetupquestions
                                SET upvotes = upvotes +1
                                WHERE id = '${resp.rows[0].id}'
                                RETURNING *
                            `;
                        const sql5=`
                            INSERT INTO questionState(question_id, user_id, action)
                            VALUES($1, $2, $3)
                            RETURNING *
                            `;
                        table.pool.query(sql2)
                        .then(()=>{
                        const newRecord =[
                            req.params.id,
                            resp.rows[0].id,
                            "upvote"
                        ] 
                        table.pool.query(sql5, newRecord)
                        .then((answer)=>{
                        const {meetup, title, body, upvotes, downvotes} = resp.rows[0];
                        return res.status(201).send({
                            status:201,
                            data:[{
                                meetup,
                                title,
                                body,
                                upvotes:upvotes+1,
                                downvotes
                            }]
                        }) })
                        .catch((err)=>{
                            return res.send({
                                status:"DB ERROR",
                                error:err.message
                            })
                        })

                        })
                    }
                })
                .catch((error)=>{
                    return res.send({
                        status:"DB ERROR",
                        error: error.message
                    })
                })  
             }
             else{
                return res.status(400).send({
                    status:400,
                    error : 'No question with such ID exist, hence No Update can be performed'
                });  
             }
         })
     	
     	

}

        static downvoteQuestion(req, res){
            if(isNaN(req.params.id))
		         return res.status(400).send({
			     status:400,
			      error: "Invalid ID. ID must be a number."
                 })
                 const sql =`
         SELECT * FROM meetupQuestions
         WHERE id = '${req.params.id}'
         `;


         table.pool.query(sql)
         .then((resp)=>{
             if(resp.rows.length > 0){
                const sql1=`
                  SELECT meetupQuestions.createdby, questionState.action
                  FROM meetupQuestions
                  INNER JOIN questionState ON meetupQuestions.id = questionState.question_id
                  `;

                table.pool.query(sql1)
                .then((response)=>{
                    if(response.rows.length > 0 && response.rows[0].action === 'upvote'){
                              // when a user has upvoted before
                           const sql2 =`
                                UPDATE meetupquestions
                                SET upvotes = upvotes - 1
                                WHERE id = '${resp.rows[0].id}'
                                RETURNING *
                            `;
                            const sql3 =`
                               UPDATE meetupquestions
                               SET downvotes = downvotes + 1
                               WHERE id = '${resp.rows[0].id}'
                               RETURNING *
                          `;

                          const sql4=`
                               UPDATE questionState
                               SET action = 'downvote'
                               WHERE user_id = '${resp.rows[0].id}'
                               RETURNING *
                        `;
                        table.pool.query(sql2);
                        table.pool.query(sql3);
                        table.pool.query(sql4);
                        const {meetup, title, body, upvotes, downvotes} = resp.rows[0];
                        return res.status(201).send({
                            status:201,
                            data:[{
                                meetup,
                                title,
                                body,
                                upvotes:upvotes-1,
                                downvotes: downvotes +1
                            }]
                        })
                        
                    
                    }
                    if(response.rows.length > 0 && response.rows[0].action === 'downvote'){
                        
                        return res.status(403).send({
                            status:403,
                            error:"You are not allowed to downvote 2 times."
                        })
                    }
                    else{         // when a user has not done anything

                        const sql2 =`
                                UPDATE meetupquestions
                                SET downvotes = downvotes +1
                                WHERE id = '${resp.rows[0].id}'
                                RETURNING *
                            `;
                        const sql5=`
                            INSERT INTO questionState(question_id, user_id, action)
                            VALUES($1, $2, $3)
                            RETURNING *
                            `;
                        table.pool.query(sql2)
                        .then(()=>{
                        const newRecord =[
                            req.params.id,
                            resp.rows[0].id,
                            "upvote"
                        ] 
                        table.pool.query(sql5, newRecord)
                        .then((answer)=>{
                        const {meetup, title, body, upvotes, downvotes} = resp.rows[0];
                        return res.status(201).send({
                            status:201,
                            data:[{
                                meetup,
                                title,
                                body,
                                upvotes,
                                downvotes
                            }]
                        }) })
                        .catch((err)=>{
                            return res.send({
                                status:"DB ERROR",
                                error:err.message
                            })
                        })

                        })
                    }
                })
                .catch((error)=>{
                    return res.send({
                        status:"DB ERROR",
                        error: error.message
                    })
                })  
             }
             else{
                return res.status(400).send({
                    status:400,
                    error : 'No question with such ID exist, hence No Update can be performed'
                });  
             }
         })
            
            
    }


          static createQuestion(req, res){

            if(isNaN(req.params.meetupID)){
			  return res.status(400).send({
				status:400,
				error:"meetupID must be a number"
            })
        }

        const sql = `
		SELECT * FROM meetupRecords
		WHERE id = '${req.params.meetupID}'
        `;
        
        const sql1 =`
        INSERT INTO meetupQuestions(createdon, createdby, meetup, title, body, upvotes, downvotes)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `;
        table.pool.query(sql)
        .then((ress)=>{
           if(ress.rows.length === 0){
            return res.status(404).send({
                status:404,
                error:"Meetup with such ID can not be found"
            })
          }

            else{
        
            const { error } = validateRecords(req.body);
            if(error)
              return res.status(400).send({
                status:400,
                error: error.details[0].message
            });

            const entry = Object.entries(req.body);

            for(const [key, value] of entry){
               if(value.trim()==='')
               return res.status(400).send({
                   status:400,
                   error:`${key} can not hold spaces as value`
               })
            }

            const {title, body} = req.body

            const newQuestion = [
                   moment().format('LL'),
                   1,
                   parseInt(req.params.meetupID),
                   title.trim(),
                   body.trim(),
                   0,
                   0

            ]

            table.pool.query(sql1, newQuestion)
            .then((resp)=>{
                const {user, meetup} = resp.rows[0];
                return res.status(201).send({
                    status : 201,
                    data : [{
                        user,
                        meetup,
                        title: title.trim(),
                        body: body.trim()
                    }]
                })
            })
            .catch((err)=>{
                return res.send({
                    status:"DB ERROR",
                    error:err.message
                })
            })

        }

        })

        .catch((error)=>{
            return res.send({
                status:"DB ERROR",
                error:error.message
            })
        })




}

}

function validateRecords(records){
    const schema = {
           title : Joi.string().min(4).required(),
           body: Joi.string().min(4).required(),
          };

     return Joi.validate(records, schema);

     }

export default questions;
