import express from 'express';
import ejs from 'ejs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import routes from './routes/routes.js';
import cookieParser from 'cookie-parser';
import expressFileUpload from 'express-fileupload'
import errorhandler from './middlewares/errorhandler.js';
const PORT = process.env.PORT || 1000


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src', 'views'));

app.use(express.json())
app.use(expressFileUpload())
app.use(express.urlencoded()); 
app.use(cookieParser())

app.use(routes)
app.use('/assets', express.static(path.join(process.cwd(), 'src', 'assets')));
app.use('/uploads', express.static(path.join(process.cwd(), 'src', 'uploads')));

app.use(errorhandler)

app.use('/*', (_, res) => {
    res.render('notfound.ejs')
})

app.listen(PORT, console.log(PORT))