const express = require('express');
const exbhbs = require('express-handlebars');
const session = require('express-session');
const app = express();
const port = 3000;
const flash = require('express-flash')

//configurações do preojecto
app.engine('handlebars', exbhbs.engine());
app.set('view engine', 'handlebars');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.use(session({
  secret: 'senha', 
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.get('/', (req, res) => {
    res.render('home');
}
);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
} )
