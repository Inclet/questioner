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
     		return res.status(206).send({
     			status : 206,
     			data : [
                    questionToUpdate
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


}


export default questions;
