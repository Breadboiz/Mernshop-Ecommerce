const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const {checkOverload} = require('./helpers/check.connect');
const stackUtils = require('stack-utils');
const compression = require('compression');
dotenv.config();

//init middleware
app.use(express.json())
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression())

//init database
//checkOverload(); //hiển thị số lượng kết nố, dung lượng với cơ sở dữ liệu
require('./db/connect.mongodb');

//init routes
app.use('/api/', require('./routes'));

//run server
const PORT = process.env.NODE_ENV === 'production' ? process.env.PROD_APP_PORT : process.env.DEV_APP_PORT; 
const server = app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
);

//init error handler
//404 error
const stack = new stackUtils({cwd: process.cwd(), internals: stackUtils.nodeInternals()});
app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});
app.use((err,req, res, next)=>{
    const statusCode = err.status || 500;
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        message: err.message || "Internal Server Error",
        stack:stack.clean(err.stack).split('\n')
    })
})

//close server
process.on('SIGINT', () => {
    server.close( () => { console.log('Server closed') })
})