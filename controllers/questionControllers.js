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


}


export default questions;
