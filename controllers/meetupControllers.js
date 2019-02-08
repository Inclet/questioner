import meetupRecords from "../data/meetupRecords";
import meetupQuestions from '../data/meetupQuestions';
import rsvp from '../data/rsvpMeetups';
import Joi from 'joi';
import moment from 'moment';
import table from '../database/db.js';



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



		const newMeetup = [
			topic.trim(),
			moment().format('LL'),
			location.trim(),
			moment(happeningOn).format('LL').trim(),
			tags.trim().split(' ') 

		]



		const sql = `
		INSERT INTO meetupRecords(topic, createdOn, location, happeningOn, tags)
		VALUES($1, $2, $3, $4, $5)
		returning *
		`;

		table.pool.query(sql, newMeetup)
		.then((ress)=>{
			return res.status(201).send({
				status:201,
				data: ress.rows
			});
		})
		.catch((err)=>{
			return res.status(400).send({
				status:400,
				error: err.message
			});
		})
	
		
	}


	static fetchMeetup(req, res){
		if(isNaN(req.params.id))
		return res.status(400).send({
			status:400,
			error: "Invalid ID. ID must be a number."
		})
		 
		const sql = `
		SELECT * FROM meetupRecords
		WHERE id = ${req.params.id}
		`;
		table.pool.query(sql)
		.then((ress)=>{
			if(ress.rows.length > 0){
			return res.status(200).send({
				status:200,
				data: ress.rows,
			})
		}

		return res.status(404).send({
			status:404,
			data:"ID can not be Found"

		})
		})
		.catch((err)=>{
			return res.send({
				status:"DB ERROR",
				erro: err.message
			})
		})

		
	}


	static getAllMeetups(req, res){
	const sql =`
	SELECT * FROM meetupRecords
	` ;

		table.pool.query(sql)
		.then((resp) => {
			if(resp.rows.length >0){
			return res.status(200).send({
				status:200,
				data: resp.rows
			})
		}
		else{
			return res.status(200).send({
				status:200,
				data: "No meetup "
			})
		}
		} )

		.catch((err)=>{
			return res.send({
				status:"DB ERROR",
				error:err.message
			})
		})
	}


	static getUpcomingMeetups(req, res){


		const sql = `
		SELECT * FROM meetupRecords
		`;

		table.pool.query(sql)
        .then((ress)=>{
		let recording = [];
        for(var i = 0; i < ress.rows.length; i++){

         if(moment(ress.rows[i].happeningOn).isSameOrAfter(moment().format('LL')))
         	  recording.push(ress.rows[i]);
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
			
		})
		.catch((err)=>{
			return releaseEvents.send({
				status:"DB ERROR",
				error: err.message
			})
		})
    }

     static respondRsvp(req, res){
		 if(isNaN(req.params.id))
		    return res.status(400).send({
			status:400,
			error: "Invalid ID. ID must be a number."
		   })
             
		   const sql = `
		   SELECT * FROM meetupRecords
		   WHERE id = ${req.params.id}
		   `;
           
		   table.pool.query(sql)
		   .then((response)=>{
			   

             if(response.rows.length>0){  	
            if (req.body.status.toLowerCase() != "yes" && req.body.status.toLowerCase() != "no" && req.body.status.toLowerCase() != "maybe")
            	return res.status(400).send({
            		status:400,
            		error : "Bad Request. value assigned to status is not valid"
				})
				
			 const { topic } = response.rows[0];
		     const {id} = req.decode;
             const newRsvp = [
             	response.rows[0].id,
				 id,
             	req.body.status
			 ]
			 const sql1 = `
			 INSERT INTO rsvp(meetup, user_id, response)
			 VALUES($1,$2,$3)
			 RETURNING *
			 `;
			 table.pool.query(sql1, newRsvp)
			 .then((resp)=>{
				 const {meetup, response } = resp.rows[0];
				 return res.status(201).send({
					 status:201,
					 data:[{
						 meetup,
						 topic,
						 status: response
					 }]
				 })
			 })
			 .catch((err)=>{
				 return res.send({
					 status:"DB",
					 error:err.message
				 })

			 })
			
		 }
		 else{
			return res.status(404).send({
				status : 404,
				error : 'No such ID can be found'
			})
		 }

         
			 
		})
		.catch((err)=>{
			return res.send({
				status:"DB ERROR",
				error:err.message
			})
		})
	 }
	 

	 static deleteMeetup(req, res){
		 const sql = `
		 SELECT * FROM meetupRecords
		 WHERE id = '${req.params.meetupID}'
		 `;

		 const sql1=`
		 DELETE FROM meetupRecords
		 WHERE id = '${req.params.meetupID}'
		 `;

		 table.pool.query(sql)
		 .then((resp)=>{
			 if(resp.rows.length>0){
				table.pool.query(sql1)
				.then((response)=>{
					return res.status(200).send({
						status:200,
						data:"Record has been successfully deleted..."
					})
				})
				.catch((err)=>{
					return res.send({
						status: "DELETION ERROR",
						error: err.message

					})
				})
			 }
			 else{
				 return res.status(404).send({
						  status:404,
						  error: "Meetup can not be found..."
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
     	   topic : Joi.string().min(2).required(),
     	   location: Joi.string().min(2).required(),
     	   happeningOn : Joi.string().min(2).required(),
     	   tags : Joi.string().min(2).required()
          };

     return Joi.validate(records, schema);

     }


export default meetup;