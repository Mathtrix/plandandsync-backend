const pool = require('../config/db');

exports.getEventsByDay = async (req, res) => {
  const { userId } = req.user;
  const { date } = req.query;

  console.log(`🔍 Fetching events for user ${userId} on date ${date}`);

  try {
    if (!date) {
      console.error('❌ Missing "date" query parameter');
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    const [rows] = await pool.execute(
      'SELECT * FROM events WHERE user_id = ? AND DATE(event_time) = ? ORDER BY event_time',
      [userId, date]
    );

    console.log(`✅ Found ${rows.length} events`);
    res.json(rows);
  } catch (error) {
    console.error('💥 Error in getEventsByDay:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

exports.addEvent = async (req, res) => {
  const { userId } = req.user;
  const { title, description, event_time } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO events (user_id, title, description, event_time) VALUES (?, ?, ?, ?)',
      [userId, title, description, event_time]
    );
    res.status(201).json({ id: result.insertId });
  } catch {
    res.status(500).json({ error: 'Failed to add event' });
  }
};

exports.updateEvent = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  const { title, description, event_time } = req.body;
  try {
    await pool.execute(
      'UPDATE events SET title = ?, description = ?, event_time = ? WHERE id = ? AND user_id = ?',
      [title, description, event_time, id, userId]
    );
    res.sendStatus(204);
  } catch {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

exports.deleteEvent = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  try {
    await pool.execute('DELETE FROM events WHERE id = ? AND user_id = ?', [id, userId]);
    res.sendStatus(204);
  } catch {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};
