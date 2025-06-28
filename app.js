const videoRoute = require('./routes/videos');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./dbConfig');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

function isLoggedIn(req, res, next) {
  if (req.session.user) next();
  else res.redirect('/login');
}

app.get('/', (req, res) => {
  res.render('home', { user: req.session.user });
});

app.get('/register', (req, res) => {
  res.render('register', { message: '' });
});

app.use('/videos', videoRoute);


app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.render('register', { message: 'Please fill all fields' });
  }
  db.query('SELECT email FROM users WHERE email = ?', [email], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      return res.render('register', { message: 'Email already exists' });
    }
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err) => {
      if (err) throw err;
      res.redirect('/login');
    });
  });
});

app.get('/login', (req, res) => {
  res.render('login', { message: '' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.render('login', { message: 'Invalid credentials' });
    req.session.user = results[0];
    res.redirect('/dashboard');
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

app.get('/dashboard', isLoggedIn, (req, res) => {
  db.query('SELECT * FROM tour_packages WHERE user_id = ?', [req.session.user.id], (err, packages) => {
    if (err) throw err;
    res.render('dashboard', { user: req.session.user, packages });
  });
});

app.get('/add-package', isLoggedIn, (req, res) => {
  res.render('add-package', { message: '' });
});

app.post('/add-package', isLoggedIn, (req, res) => {
  const { title, description } = req.body;
  db.query('INSERT INTO tour_packages (user_id, title, description) VALUES (?, ?, ?)',
    [req.session.user.id, title, description], (err) => {
      if (err) throw err;
      res.redirect('/dashboard');
    });
});

app.get('/feedback', isLoggedIn, (req, res) => {
  res.render('feedback', { message: '' });
});

app.post('/feedback', isLoggedIn, (req, res) => {
  const { message } = req.body;
  db.query('INSERT INTO feedback (user_id, message) VALUES (?, ?)', [req.session.user.id, message], (err) => {
    if (err) throw err;
    res.redirect('/dashboard');
  });
});

app.get('/gallery', (req, res) => {
  res.render('gallery', { user: req.session.user });
});

app.get('/trekking-planner', isLoggedIn, (req, res) => {
  res.render('trekking-planner');
});

app.post('/trekking-planner', isLoggedIn, (req, res) => {
  const { destination, duration, season, notes } = req.body;
  res.render('trekking-planner-result', {
    destination,
    duration,
    season,
    notes
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
