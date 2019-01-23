import meetupQuestions from '../data/meetupQuestions';
import Joi from 'joi';
import moment from 'moment';
import user from '../data/users';
import table from '../database/db.js';


class questions{

	constructor(){

	}

      static upvoteQuestion(req, res){

        if(isNaN(req.params.id))
		return res.status(400).send({
			status:400,
			error: "Invalid ID. ID must be a number."
        })
        
     	const questionToUpdate = meetupQuestions.find( c => c.id === parseInt(req.params.id));
     	
     	if(!questionToUpdate)
     		return res.status(400).send({
     			status:400,
     			error : 'No question with such ID exist, hence No Update can be performed'
     		});

     	if(questionToUpdate){

         const checkAction = questionToUpdate.state.find(c => c.id === parseInt(user[0].id))

         if(checkAction && checkAction.action ==="downvote"){

            questionToUpdate.upvotes +=1;
            questionToUpdate.downvotes -=1;
            checkAction.action="upvote"
            questionToUpdate.state.push(checkAction)

            const { meetup, title, body, upvotes, downvotes } = questionToUpdate;
 
             return res.status(201).send({
                 status : 201,
                 data : [
                 {
                     meetup,
                     title,
                     body,
                     upvotes,
                     downvotes
                 }
                 ]
             })
            }

        if(checkAction && checkAction.action ==="upvote"){

             return res.status(403).send({
                 status:403,
                 error:"You are not allowed to upvote 2 times."
             })
         }


        if(!checkAction){

            questionToUpdate.upvotes = questionToUpdate.upvotes + 1;
            const { meetup, title, body, upvotes, downvotes } = questionToUpdate;
            const newAction = {
                id: user[0].id,
                action:"upvote"
            }
            questionToUpdate.state.push(newAction);

     		return res.status(201).send({
     			status : 201,
     			data : [
                    {
                        meetup,
                        title,
                        body,
                        upvotes,
                        downvotes
                    }
     			]
             })
            }
     }

}

        static downvoteQuestion(req, res){
            if(isNaN(req.params.id))
		         return res.status(400).send({
			     status:400,
			      error: "Invalid ID. ID must be a number."
		         })
            
            const questionToDownVote = meetupQuestions.find( c => c.id === parseInt(req.params.id));
        
         if(!questionToDownVote)
            return res.status(400).send({
                status:400,
                error : 'No question with such ID exist, hence No Update can be performed'
            });

        if(questionToDownVote){
            const checkAction = questionToDownVote.state.find(c => c.id === parseInt(user[0].id))
           
            if(checkAction && checkAction.action ==="upvote"){
               questionToDownVote.upvotes -=1;
               questionToDownVote.downvotes +=1;
               checkAction.action="downvote"
            questionToDownVote.state.push(checkAction)
            const { meetup, title, body, upvotes, downvotes } = questionToDownVote;

            return res.status(201).send({
                status : 201,
                data : [
                {
                    meetup,
                    title,
                    body,
                    upvotes,
                    downvotes
                }
                ]
            })
           }
           if(checkAction && checkAction.action ==="downvote"){
            return res.status(403).send({
                status:403,
                error:"You are not allowed to downvote 2 times."
            })
        }

            if(!checkAction){
            questionToDownVote.downvotes += 1;
            const { meetup, title, body, upvotes, downvotes } = questionToDownVote;
            const newAction = {
                id: user[0].id,
                action:"downvote"
            }
            questionToDownVote.state.push(newAction);

            return res.status(201).send({
                status : 201,
                data : [
                {
                    meetup,
                    title,
                    body,
                    upvotes,
                    downvotes
                }
                ]
            })
            }

        }
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
		WHERE id = ${req.params.id}
		`;
        table.pool.query(sql)
        .then((ress)=>{
           if(ress.rows.length === 0)
            return res.status(404).send({
                status:404,
                error:"Meetup with such ID can not be found"
            })
        
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

            const newQuestion = {
                   createdOn : moment().format('LL'),
                   createdBy : 1,
                   meetup : parseInt(req.params.meetupID),
                   title : title.trim(),
                   body: body.trim(),
                   upvotes : 0,
                   downvotes: 0,
                   state:[]

            }


            meetupQuestions.push(newQuestion);


            return res.status(201).send({
                status : 201,
                data : [{
                    user : newQuestion.createdBy,
                    meetup : newQuestion.meetup,
                    title: title.trim(),
                    body: body.trim()
                }]
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
