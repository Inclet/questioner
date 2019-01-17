import meetupRecords from "../data/meetupRecords";
import meetupQuestions from '../data/meetupQuestions';
import rsvp from '../data/rsvpMeetups';
import Joi from 'joi';
import moment from 'moment';
import { isString } from "util";

moment.suppressDeprecationWarnings = true;


class meetup{
	
	static create(req, res){
		const { topic, location, happeningOn, tags } = req.body;

		if(!isNaN(happeningOn))
			return res.status(400).send({
				status:400,
				error:"Invalid Date"
			})
		
		if(!moment(happeningOn).isValid())
		 return res.status(400).send({
			 status:400,
			 error: "Invalid date"
		 })

		 if(moment(happeningOn).isSameOrBefore(moment().format('LL')))
		 return res.status(400).send({
			 status:400,
			 error: "Date must be in the future"
		 })



		const { error } = validateRecords(req.body);
		if(error)
		     return res.status(400).send({
                status:400,
				error: error.details[0].message
			});



		const entry = Object.entries(req.body);
		for(const [key,value] of entry){
			if(value.trim()==='')
			return res.status(400).send({
				status:400,
				error:`${key} can not have spaces as value`
			})
		}



		const newMeetup = {
			id: parseInt(meetupRecords.length + 1 ),
			topic: topic.trim(),
			createdOn: moment().format('LL'),
			location:location.trim(),
			happeningOn : moment(happeningOn).format('LL').trim(),
			tags : tags.trim().split(' ') 

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
		if(isNaN(req.params.id))
		return res.status(400).send({
			status:400,
			error: "Invalid ID. ID must be a number."
		})
		const meetupId = meetupRecords.find(c => c.id === parseInt(req.params.id));
		if(!meetupId)
			return res.status(404).send({
				status:404,
				error : 'No such meetup Can Be Found'
			});

		const {id, topic, location, happeningOn, tags} = meetupId;

		res.status(200).send({
			status:200,
			data : [{
				id,
				topic,
				location,
				happeningOn,
				tags
			}]
		})
	}


	static getAllMeetups(req, res){
		return res.send({
			status : 200,
			data : meetupRecords
		})
	}


	static getUpcomingMeetups(req, res){

		var recording = [];



        for(var i = 0; i < meetupRecords.length; i++){

         if(moment(meetupRecords[i].happeningOn).isSameOrAfter(moment().format('LL')))
         	  recording.push(meetupRecords[i]);
        }

        if(recording.length > 0)
        	return res.status(200).send({
        		status : 200,
        		data : 
                   recording
        		
        	});
        else
        	return res.status(404).send({
        		status: 404,
        		error : "No Upcoming meetup..."
        	});
    }

     static respondRsvp(req, res){
		 if(isNaN(req.params.id))
		    return res.status(400).send({
			status:400,
			error: "Invalid ID. ID must be a number."
		   })
             
             const meetupId = meetupRecords.find(c => c.id === parseInt(req.params.id));

             if(meetupId){
             	
             	
            if (req.body.status.toLowerCase() != "yes" && req.body.status.toLowerCase() != "no" && req.body.status.toLowerCase() != "maybe")
            	return res.status(400).send({
            		status:400,
            		error : "Bad Request. value assigned to status is not valid"
            	})
             const { topic } = meetupId;
             const newRsvp = {
                id : parseInt(rsvp.length) + 1,
             	meetup : meetupId.id,
             	topic,
             	status : req.body.status
             }

             rsvp.push(newRsvp);

             return res.status(201).send({
             	status : 201,
             	data : [{
                  meetup : newRsvp.meetup,
                  topic : newRsvp.topic,
                  status : newRsvp.status
             	}
             	]
             })
         }

         if(!meetupId)
         	return res.status(404).send({
         		status : 404,
         		error : 'No such ID can be found'
         	})
     }



}


function validateRecords(records){
	const schema = {
     	   topic : Joi.string().min(2).required(),
     	   location: Joi.string().min(2).required(),
     	   happeningOn : Joi.string().min(2).required(),
     	   tags : Joi.string().min(2).required()
          };

     return Joi.validate(records, schema);

     }


export default meetup;