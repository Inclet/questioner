import express from 'express';
import meetupControllers from '../controllers/meetupControllers';

const router = express.Router();

router.post('/meetups', meetupControllers.create);
router.get('/meetups/:id', meetupControllers.fetchMeetup);
router.get('/meetups', meetupControllers.getAllMeetups);


export default router;

