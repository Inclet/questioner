import meetupQuestions from '../data/meetupQuestions';
import Joi from 'joi';
import moment from 'moment';


class questions{

	constructor(){

	}

      static upvoteQuestion(req, res){


     	const questionToUpdate = meetupQuestions.find( c => c.id === parseInt(req.params.id));
     	
     	if(!questionToUpdate)
     		return res.status(400).send({
     			status:400,
     			error : 'No question with such ID exist, hence No Update can be performed'
     		});

     	if(questionToUpdate){
            
            questionToUpdate.votes = questionToUpdate.votes + 1;
            const { meetup, title, body, votes } = questionToUpdate;

     		return res.status(201).send({
     			status : 201,
     			data : [
                    {
                        meetup,
                        title,
                        body,
                        votes
                    }
     			]
     		})
     }

}

        static downvoteQuestion(req, res){
            
            const questionToDownVote = meetupQuestions.find( c => c.id === parseInt(req.params.id));
        
        if(!questionToDownVote)
            return res.status(400).send({
                status:400,
                error : 'No question with such ID exist, hence No Update can be performed'
            });

        if(questionToDownVote){

            questionToDownVote.votes -= 1;

            const { meetup, title, body, votes } = questionToDownVote;

            return res.status(201).send({
                status : 201,
                data : [
                {
                    meetup,
                    title,
                    body,
                    votes
                }
                ]
            })
     }

        }


        static createQuestion(req, res){

        
            const { error } = validateRecords(req.body);
            if(error)
              return res.status(400).send({
                status:400,
                error: error.details[0].message
            });

            const {title, body} = req.body

            const newQuestion = {
                   id : parseInt(meetupQuestions.length +1),
                   createdOn : moment().format('LL'),
                   createdBy : 1,
                   meetup : 1,
                   title,
                   body,
                   votes : 0

            }


            meetupQuestions.push(newQuestion);


            return res.status(201).send({
                status : 201,
                data : [{
                    user : newQuestion.createdBy,
                    meetup : newQuestion.meetup,
                    title,
                    body
                }]
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
