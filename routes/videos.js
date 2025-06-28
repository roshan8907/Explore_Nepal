// routes/videos.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('videos');
});

module.exports = router;
