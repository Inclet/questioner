import express from 'express';
import meetupControllers from '../controllers/meetupControllers';
import questionControllers from '../controllers/questionControllers';


const router = express.Router();

router.post('/api/v1/meetups', meetupControllers.create);
router.post('/api/v1/meetups/:id/rsvps', meetupControllers.respondRsvp);
router.post('/api/v1/meetups/:meetupID/questions/', questionControllers.createQuestion);
router.get('/api/v1/meetups/:id', meetupControllers.fetchMeetup);
router.get('/api/v1/meetup/upcoming', meetupControllers.getUpcomingMeetups);
router.get('/api/v1/meetups', meetupControllers.getAllMeetups);
router.patch('/api/v1/questions/:id/upvote', questionControllers.upvoteQuestion);
router.patch('/api/v1/questions/:id/downvote', questionControllers.downvoteQuestion);



export default router;

