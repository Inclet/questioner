import express from 'express';
import meetupControllers from '../controllers/meetupControllers';
import questionControllers from '../controllers/questionControllers';
import users from '../controllers/users';


const router = express.Router();

router.post('/api/v1/meetups', meetupControllers.create);
router.post('/api/v1/meetups/:id/rsvps', meetupControllers.respondRsvp);
router.post('/api/v1/meetups/:meetupID/questions/', questionControllers.createQuestion);
router.post('/api/v1/auth/login', users.login);
router.post('/api/v1/auth/signup', users.signup);
router.post('/api/v1/questions/:questionID/comments', users.commenting)
router.get('/api/v1/meetups/:id', meetupControllers.fetchMeetup);
router.get('/api/v1/meetup/upcoming', meetupControllers.getUpcomingMeetups);
router.get('/api/v1/meetups', meetupControllers.getAllMeetups);
router.patch('/api/v1/questions/:id/upvote', questionControllers.upvoteQuestion);
router.patch('/api/v1/questions/:id/downvote', questionControllers.downvoteQuestion);




export default router;

