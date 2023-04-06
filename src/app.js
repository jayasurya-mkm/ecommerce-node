const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
var path = require('path');
const cors = require('cors');

const bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
const router = require('./routers/index');


const connectDB = require('./db/mongoose');

var url = require('url');

//Load Config
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

app.use(bodyParser.json());

app.use(cors());


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


// Loggin
if (process.env.Node_ENV === 'development') {
    app.use(morgan('dev'));
}

// Static Folder
app.use(express.static(path.join(__dirname, './public')));
// app.use(express.static('public'));


// Handlebars
app.engine('.hbs', exphbs({defaultLayout: 'index', extname: '.hbs'}));
// app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', '.hbs');
    
app.use(express.urlencoded({ extended: false }));

app.use('/user', cors(), router.userRouter);
app.use('/products', router.productsRouter);
app.use('/category', router.categoriesRouter);
app.use('/cart', router.cartRouter)

app.use('/', (req, res) => {
    res.render('dashboard');
});

const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.Node_ENV} mode on port ${PORT}`)
);