import express from 'express';
import meetupControllers from '../controllers/meetupControllers';
import questionControllers from '../controllers/questionControllers';
import users from '../controllers/users';
import valid from '../helpers/validator';


const router = express.Router();

router.post('/api/v1/meetups', valid,meetupControllers.create);
router.post('/api/v1/meetups/:id/rsvps', valid, meetupControllers.respondRsvp);
router.post('/api/v1/meetups/:meetupID/questions/', valid,questionControllers.createQuestion);
router.post('/api/v1/auth/login', users.login);
router.post('/api/v1/auth/signup', users.signup);
router.post('/api/v1/questions/:questionID/comments', valid, users.commenting);
router.get('/api/v1/meetups/:id', valid, meetupControllers.fetchMeetup);
router.get('/api/v1/meetup/upcoming', valid,meetupControllers.getUpcomingMeetups);
router.get('/api/v1/meetups', valid,meetupControllers.getAllMeetups);
router.patch('/api/v1/questions/:id/upvote', valid,questionControllers.upvoteQuestion);
router.patch('/api/v1/questions/:id/downvote', valid,questionControllers.downvoteQuestion);
router.delete('/api/v1/meetups/:meetupID', valid,meetupControllers.deleteMeetup)




export default router;

