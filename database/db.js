import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class Setup{
    constructor(){
       this.pool = new Pool({
           user:'postgres',
           host:'localhost',
           database:'mydb',
           password:'Gievansrosey18!',
           port:5000
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

        const meetupQuestions = `
        CREATE TABLE IF NOT EXISTS meetupQuestions(
            id SERIAL PRIMARY KEY,
            createdOn VARCHAR(30) NOT NULL,
            createdBy INT NOT NULL REFERENCES meetupRecords(id) ON DELETE CASCADE ON UPDATE CASCADE,
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

        
        const users = `
        CREATE TABLE IF NOT EXISTS user_table(
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            othername VARCHAR(50),
            email VARCHAR(40) NOT NULL,
            phonenumber VARCHAR(15) NOT NULL,
            username VARCHAR(20) NOT NULL UNIQUE,
            password VARCHAR(18) NOT NULL,
            registered VARCHAR(50) NOT NULL,
            isAdmin BOOLEAN NOT NULL
        )`;

        this.pool.query(users)
        .then((res)=>{
            console.log(res)
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
            this.pool.end();
        })

    }
}

export default new Setup();