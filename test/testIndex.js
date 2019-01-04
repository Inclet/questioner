 import chai from 'chai';
 import chaiHttp from 'chai-http';
 import app from '../index';

 chai.should();

 chai.use(chaiHttp);

 describe('get all meetup records', () => {
   it('/GET /meetups', (done) =>{

    chai.request(app)
        .get('/meetups')
        .end((err, res)=>{
           res.body.should.be.a('object');
           res.body.should.have.property('status').eql(200);
           res.body.should.have.property('data');
           res.body.data.should.be.a('array');
           res.body.data[0].should.have.property('id');
           res.body.data[0].should.have.property('createdOn');
           res.body.data[0].should.have.property('topic');
           res.body.data[0].should.have.property('location');
           res.body.data[0].should.have.property('happeningOn');
           res.body.data[0].should.have.property('tags');
           res.body.data[0].tags.should.be.a('array');
           done();
        })

   })

 });

 describe('get a specific meetup record', ()=>{
   it('/GET /meetups/<meetup-id>', (done)=>{

            chai.request(app)
               .get('/meetups/1')
               .end((err, res)=>{
               	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(200);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('id').eql(1);
                res.body.data[0].should.have.property('topic').eql('Future Transport');
                res.body.data[0].should.have.property('location').eql('Remera');
                res.body.data[0].should.have.property('happeningOn').eql('December 28, 2019');
                res.body.data[0].should.have.property('tags');
                res.body.data[0].tags.should.be.a('array');
                done();
               })

   });

});

 describe('Create A meetup Record', ()=>{
 	it('/POST /meetups', (done)=>{
 		const record = {
            topic: "Electronic Values",
            location: "kacyiru",
            happeningOn: "December 30, 2019",
            tags:"#Electronic #valves"
 		}

 		chai.request(app)
 		    .post('/meetups')
 		    .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(201);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('id').eql(2);
                res.body.data[0].should.have.property('createdOn');
                res.body.data[0].should.have.property('topic').eql('Electronic Values');
                res.body.data[0].should.have.property('location').eql('kacyiru');
                res.body.data[0].should.have.property('happeningOn').eql('December 30, 2019');
                res.body.data[0].should.have.property('tags');
                res.body.data[0].tags.should.be.a('array');
                done();
 		    })
 	})

 	it('it should not post a meetup --when topic is not included ', (done)=>{
 		const record = {
            location: "kacyiru",
            happeningOn: "December 30, 2018",
            tags:"#Electronic #valves"
 		}

 		chai.request(app)
 		    .post('/meetups')
 		    .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});


 	it('it should not post a meetup --when topic or title is a not a string or topic is not at minimum 4 characters', (done)=>{
 		const record = {
 			topic: 1,
            location: "kacyiru",
            happeningOn: "December 30, 2018",
            tags:"#Electronic #valves"
 		}

 		chai.request(app)
 		    .post('/meetups')
 		    .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});



 	it('it should not post a meetup --when location is not defined', (done)=>{
 		const record = {
 			topic: "Electronic Values",
            happeningOn: "December 30, 2018",
            tags:"#Electronic #valves"
 		}

 		chai.request(app)
 		    .post('/meetups')
 		    .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});


 	it('it should not post a meetup --when location is not a string or at minimum 2 characters', (done)=>{
 		const record = {
 			topic: "Electronic Values",
 			location : 1,
            happeningOn: "December 30, 2018",
            tags:"#Electronic #valves"
 		}

 		chai.request(app)
 		    .post('/meetups')
 		    .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});

   
   it('it should not post a meetup --when happeningOn is not defined', (done)=>{
 		const record = {
 			topic: "Electronic Values",
 			location : 'kacyiru',
            tags:"#Electronic #valves"
 		}

 		chai.request(app)
 		    .post('/meetups')
 		    .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});



   it('it should not post a meetup --when happeningOn is not a string or at minimum 2 characters', (done)=>{
 		const record = {
 			topic: "Electronic Values",
 			location : 'kacyiru',
            happeningOn: 12/30/2018,
            tags:"#Electronic #valves"
 		}

 		chai.request(app)
 		    .post('/meetups')
 		    .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});



   it('it should not post a meetup --when location is not a defined', (done)=>{
 		const record = {
 			topic: "Electronic Values",
 			location : 'kacyiru',
            happeningOn: "December 30, 2018"
            
 		}

 		chai.request(app)
 		    .post('/meetups')
 		    .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});


   it('it should not post a meetup --when tags is not a string or at minimum 2 characters', (done)=>{
 		const record = {
 			topic: "Electronic Values",
 			location : 'kacyiru',
            happeningOn: "December 30, 2018",
            tags:2
 		}

 		chai.request(app)
 		    .post('/meetups')
 		    .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                done();
 		    })
 	});


 	
 });


 describe('Fetch all upcoming meetups', ()=>{
 	it('/GET /meetup/upcoming', (done)=>{
          const record = {
            topic: "Electronic Values",
            location: "kacyiru",
            happeningOn: "December 30, 2019",
            tags:"#Electronic #valves"
 		}

        chai.request(app)
             .get('/meetup/upcoming')
             .end((err, res)=>{

             	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(200);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('id').eql(1);
                res.body.data[0].should.have.property('createdOn');
                res.body.data[0].should.have.property('topic').eql('Future Transport');
                res.body.data[0].should.have.property('location').eql('Remera');
                res.body.data[0].should.have.property('happeningOn').eql('December 28, 2019');
                res.body.data[0].should.have.property('tags');
                res.body.data[0].tags.should.be.a('array');
                done();
             })



 	})
 });


 


 describe('increasing a vote by 1 on a specific meetup', ()=>{
 	it('/PATCH /questions/1/upvote', (done)=>{
 		

 		chai.request(app)
 		    .patch('/questions/1/upvote')
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(201);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('meetup').eql(2);
                res.body.data[0].should.have.property('body').eql('we are moving into the new era...');
                res.body.data[0].should.have.property('title').eql('Future Transport');
                res.body.data[0].should.have.property('votes').eql(6);
                done();
 		    })
 	})
 });



 describe('Decreasing a vote by 1 on a specific meetup', ()=>{
 	it('/PATCH /questions/1/downvote', (done)=>{
          
          chai.request(app)
 		    .patch('/questions/1/downvote')
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(201);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('meetup').eql(2);
                res.body.data[0].should.have.property('body').eql('we are moving into the new era...');
                res.body.data[0].should.have.property('title').eql('Future Transport');
                res.body.data[0].should.have.property('votes').eql(5);
                done();
 		    });
 	})
 });


 describe('Respond to meetup RSVP', ()=>{
 	it('/POST /meetups/1/rsvps', (done)=>{

 		  const record = {
 		  	status: "yes"
 		  }
          
          chai.request(app)
 		    .post('/meetups/1/rsvps')
 		    .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(201);
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('meetup').eql(1);
                res.body.data[0].should.have.property('status').eql('yes');
                
                done();
 		    });
 	})

 	it('Can not respond to meetup RSVP -- when status value is different from yes, no, or maybe', (done)=>{

 		  const record = {
 		  	status:"1"
 		  }
          
          chai.request(app)
 		    .post('/meetups/1/rsvps')
 		    .send(record)
 		    .end((err, res)=>{
 		    	res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                
                
                done();
 		    });
 	})
 });


 describe('Creating a question for a specific meetup', ()=>{

 	it('/POST /questions', (done)=>{

 		const record = {
 			title : "Future Economics",
 			body : "How Will It Look like"
 		}

 		chai.request(app)
 		    .post('/questions')
 		    .send(record)
 		    .end((err, res)=>{
            
                res.body.should.be.a('object');
                res.body.should.have.property('status');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('title').eql('Future Economics');
                res.body.data[0].should.have.property('body').eql('How Will It Look like');
                res.body.data[0].should.have.property('meetup').eql(1);
                res.body.data[0].should.have.property('user').eql(1);

                done();
 		    })

 	})


 	it('can not post a question when title is not defined', (done)=>{

 		const record = {
 			body : "How Will It Look like"
 		}

 		chai.request(app)
 		    .post('/questions')
 		    .send(record)
 		    .end((err, res)=>{
            
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                
                done();
 		    })

 	});


 	it('can not post a question when title is not a string or at minimum 4 characters', (done)=>{

 		const record = {
 			title : 1,
 			body : "How Will It Look like"
 		}

 		chai.request(app)
 		    .post('/questions')
 		    .send(record)
 		    .end((err, res)=>{
            
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                
                done();
 		    })

 	});


 	it('can not post a question when body is not defined', (done)=>{

 		const record = {
 			title : "Future Economics"
 		}

 		chai.request(app)
 		    .post('/questions')
 		    .send(record)
 		    .end((err, res)=>{
            
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                
                done();
 		    })

 	});

   it('can not post a question when body is not a string or at minimum 4 characters', (done)=>{

 		const record = {
 			title : "Future Economics",
 			body : 2
 		}

 		chai.request(app)
 		    .post('/questions')
 		    .send(record)
 		    .end((err, res)=>{
            
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(400);
                
                done();
 		    })

 	});

 })





 

