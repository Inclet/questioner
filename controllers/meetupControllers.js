import meetupRecords from "../data/meetupRecords";
import Joi from 'joi';
import moment from 'moment';


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
			happeningOn: moment(happeningOn).format('LL'),
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


	static fetchMeetup(req, res){
		const meetupId = meetupRecords.find(c => c.id === parseInt(req.params.id));
		if(!meetupId)
			return res.status(404).send({
				status:404,
				error : 'No such meetup Can Be Found'
			});

		const {id, topic, location, happeningOn, tags} = meetupId;

		res.send({
			status:201,
			data : [{
				id,
				topic,
				location,
				happeningOn,
				tags : tags.split(' ')
			}]
		})
	}



}

function validateRecords(records){
	const schema = {
     	   topic : Joi.string().min(4).required(),
     	   location: Joi.string().min(1).required(),
     	   happeningOn: Joi.string().min(1).required(),
     	   tags: Joi.string().min(1).required()
          };

     return Joi.validate(records, schema);

     }


export default meetup;