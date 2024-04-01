const cluster = require('cluster');
const {start} = require('./src/app');

if(cluster.isWorker) {
    start();
}else {
    cluster.fork();
    cluster.fork();
}