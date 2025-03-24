const express = require('express');
const router = express.Router();
const events = require('../controllers/eventController');
const authenticate = require('../middleware/authenticate');

router.use(authenticate);

router.get('/', events.getEventsByDay);
router.post('/', events.addEvent);
router.put('/:id', events.updateEvent);
router.delete('/:id', events.deleteEvent);

module.exports = router;
