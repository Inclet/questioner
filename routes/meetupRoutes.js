import express from 'express';
import meetupControllers from '../controllers/meetupControllers';
import questionControllers from '../controllers/questionControllers';


const router = express.Router();

router.post('/meetups', meetupControllers.create);
router.post('/meetups/:id/rsvps', meetupControllers.respondRsvp);
router.post('/questions', questionControllers.createQuestion);
router.get('/meetups/:id', meetupControllers.fetchMeetup);
router.get('/meetup/upcoming/', meetupControllers.getUpcomingMeetups);
router.get('/meetups', meetupControllers.getAllMeetups);
router.patch('/questions/:id/upvote', questionControllers.upvoteQuestion);
router.patch('/questions/:id/downvote', questionControllers.downvoteQuestion);



export default router;

