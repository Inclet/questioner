import express from 'express';
import meetuproutes from './routes/meetupRoutes';
import bodyparser from 'body-parser';


const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended: false
}))
app.use(meetuproutes);


const port = process.env.PORT || 3000;

app.use('/api/v1/users', meetuproutes);


app.listen(port, () => console.log(`Example listening on port ${port}!`));

export default app;