const express = require('express');
const webpush = require('web-push');
const router = express.Router();

webpush.setVapidDetails(
  'mailto:support@syncandplan.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const subscriptions = [];

router.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: 'Subscribed' });
});

router.post('/notify', async (req, res) => {
  const { title, message } = req.body;
  const payload = JSON.stringify({ title, message });

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(sub, payload);
    } catch (err) {
      console.error('Push error:', err);
    }
  }

  res.sendStatus(200);
});

module.exports = router;
