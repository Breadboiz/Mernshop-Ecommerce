'use strict'

const mongoose = require('mongoose')
const os = require('os');
const process = require('process');
const _SECONDS = 10000; 

//đếm số lượng connect với database
const checkConnect = () => {
    const numberOfConnects = mongoose.connections.length;
    console.log('number of connection: ', numberOfConnects);
} 

const checkOverload = () => {
    const numberOfConnects = mongoose.connections.length;
    const cpuCount = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss / 1024 / 1024;
    setInterval(() => {
        console.log("Number of connections: " + numberOfConnects);
        console.log("Memory usage: " + memoryUsage + " MB");

        //Kiểm tra nếu quá tải kết nối
        const maxConnections = cpuCount * 5;
        if (numberOfConnects > maxConnections) {
            console.log("Overload detected! Closing connections...");
            console.log('Overload connection');
            console.log('number of connection: ', numberOfConnects);
            console.log('number of CPU: ', cpuCount);
            console.log('memory usage: ', memoryUsage);
        }
    }, _SECONDS)
}

module.exports = {
    checkConnect,
    checkOverload
}