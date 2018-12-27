import meetupRecords from "../data/meetupRecords";
import Joi from 'joi';


class meetup{
	constructor(){
		
	}

	static create(req, res){
		const { topic, location, happeningOn, tags } = req.body;

		const { error } = validateRecords(req.body);
		if(error)
			return res.status(400).send(error.details[0].message);

		const newMeetup = {
			id: parseInt(meetupRecords.length + 1 ),
			topic,
			location,
			happeningOn,
			tags
		}

		meetupRecords.push(newMeetup);
		return res.status(201).send({
			status:201,
			data:[
			    newMeetup
			]
		})
	}



}

function validateRecords(records){
	const schema = {
     	   topic : Joi.string().min(4).required(),
     	   location: Joi.string().min(1).required() 
          };

     return Joi.validate(records, schema);

     }


export default meetup;