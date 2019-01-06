import express from 'express';
import meetuproutes from './routes/meetupRoutes';
import bodyparser from 'body-parser';


const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended: false
}))

const port = process.env.PORT || 3000;


app.use(meetuproutes);

app.use('/', (req,res) =>{
	res.send('Welcome to Questioner APIs');
});




app.listen(port, () => console.log(`Example listening on port ${port}!`));

export default app;