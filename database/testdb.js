import { Pool } from 'pg';
import ENV from 'dotenv';
ENV.config();

class Setup{
    constructor(){
       this.pool = new Pool({
           user: process.env.PGUSER,
           host:process.env.PGHOST,
           database:process.env.PGTESTDB,
           password:process.env.PGPASSWORD,
           port:process.env.PGPORT
       });

       this.pool.on('connect',()=> {
           console.log('connected...');
       })

       this.createTables();
       
    }

    createTables(){


        const meetupRecords = `
        CREATE TABLE IF NOT EXISTS meetupRecords(
            id SERIAL PRIMARY KEY,
            createdOn VARCHAR(30) NOT NULL,
            location TEXT NOT NULL,
            topic VARCHAR(50) NOT NULL,
            happeningOn VARCHAR(30) NOT NULL,
            tags TEXT NOT NULL

        )`;
        
        this.pool.query(meetupRecords)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error.message);
        })

        const users = `
        CREATE TABLE IF NOT EXISTS user_table(
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            othername VARCHAR(50),
            email VARCHAR(40) NOT NULL UNIQUE,
            phonenumber INT NOT NULL,
            username VARCHAR(20) NOT NULL UNIQUE,
            password VARCHAR(18) NOT NULL,
            registered VARCHAR(50) NOT NULL,
            isAdmin BOOLEAN NOT NULL DEFAULT false
        )`;

        this.pool.query(users)
        .then((res)=>{
            console.log(res)
        })
        .catch((error)=>{
            console.log(error.message);
        })

        const meetupQuestions = `
        CREATE TABLE IF NOT EXISTS meetupQuestions(
            id SERIAL PRIMARY KEY,
            createdOn VARCHAR(30) NOT NULL,
            createdBy INT NOT NULL REFERENCES user_table(id) ON DELETE CASCADE ON UPDATE CASCADE,
            meetup INT NOT NULL REFERENCES meetupRecords(id) ON DELETE CASCADE ON UPDATE CASCADE,
            title VARCHAR(100) NOT NULL,
            body VARCHAR(100)  NOT NULL,
            upvotes INT NOT NULL,
            downvotes INT NOT NULL

        )`;
         

        this.pool.query(meetupQuestions)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error.message);
        })

        
       

        const rsvp = `
        CREATE TABLE IF NOT EXISTS rsvp(
            id SERIAL PRIMARY KEY,
            meetup INT NOT NULL REFERENCES meetupRecords(id) ON DELETE CASCADE ON UPDATE CASCADE,
            user_id INT NOT NULL REFERENCES user_table(id) ON DELETE CASCADE ON UPDATE CASCADE,
            response VARCHAR(4) NOT NULL

        )`;
          

        this.pool.query(rsvp)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error.message);
        })


        const commentsTables = `
        CREATE TABLE IF NOT EXISTS comments(
            user_id INT NOT NULL REFERENCES user_table(id) ON DELETE CASCADE ON UPDATE CASCADE,
            question_id INT NOT NULL REFERENCES meetupQuestions(id) ON DELETE CASCADE ON UPDATE CASCADE,
            comment text NOT NULL,
            happenedOn VARCHAR(20)
        )`;

        this.pool.query(commentsTables)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error.message);
        })

        const questionState =`
        CREATE TABLE IF NOT EXISTS questionState(
           question_id INT NOT NULL REFERENCES meetupQuestions(id) ON DELETE CASCADE ON UPDATE CASCADE,
           user_id INT NOT NULL,
           action VARCHAR(8) NOT NULL
        )`; 

        this.pool.query(questionState)
        .then((res)=>{
            console.log(res);
        })
        .catch((error)=>{
            console.log(error.message);
        })

    }
}

export default new Setup();