const mongoose = require('mongoose');
const {db:{host, port, name}} = require('../config/config.mongodb');
const {checkConnect, checkOverload} = require('../helpers/check.connect');
const connectString = `mongodb://${host}:${port}/${name}`


//Kết nối cơ sở dữ liệu
class connectMongoDB {
    constructor() {
        this.connect();
    } 
    connect(type = 'mongodb') {
        console.log(connectString)
        checkConnect()
        // if(process.env.NODE_ENV !== 'production') {
        //     mongoose.set('debug', true);
        //     mongoose.set('debug', { color: true });
        // }
        mongoose.connect(connectString, {
            maxPoolSize:100
        })
    }
    static getInstance() {
        if(!this.instance) {
            this.instance = new connectMongoDB();
        }
        return this.instance;
    }
}

module.exports = connectMongoDB.getInstance();