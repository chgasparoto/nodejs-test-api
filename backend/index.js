require('dotenv').config()

const cluster = require('cluster')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const movieRoutes = require('./routes/movie')
const trailerRoutes = require('./routes/trailer')

process.on('unhandledRejection', (rejectionErr) => {
  console.log('unhandledRejection Err::', rejectionErr)
  console.log('unhandledRejection Stack::', JSON.stringify(rejectionErr.stack))
})

process.on('uncaughtException', (uncaughtExc) => {
  console.log('uncaughtException Err::', uncaughtExc)
  console.log('uncaughtException Stack::', JSON.stringify(uncaughtExc.stack))
})

const app = express()
const port = process.env.PORT
const workers = []

/**
 * Setup number of worker processes to share port which will be defined while setting up server
 */
const setupWorkerProcesses = () => {
  // to read number of cores on system
  let numCores = require('os').cpus().length
  console.log('Master cluster setting up ' + numCores + ' workers')

  // iterate on number of cores need to be utilized by an application
  // current example will utilize all of them
  for (let i = 0; i < numCores; i++) {
    // creating workers and pushing reference in an array
    // these references can be used to receive messages from workers
    workers.push(cluster.fork())

    // to receive messages from worker process
    workers[i].on('message', function (message) {
      console.log(message)
    })
  }

  // process is clustered on a core and process id is assigned
  cluster.on('online', function (worker) {
    console.log('Worker ' + worker.process.pid + ' is listening')
  })

  // if any of the worker process dies then start a new one by simply forking another one
  cluster.on('exit', function (worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal)
    console.log('Starting a new worker')
    cluster.fork()
    workers.push(cluster.fork())
    // to receive messages from worker process
    workers[workers.length - 1].on('message', function (message) {
      console.log(message)
    })
  })
}

/**
 * Setup an express server and define port to listen all incoming requests for this application
 */
const setUpExpress = () => {
  // logger
  app.use(morgan('tiny'))

  app.use(cors())
  app.use(bodyParser.json())

  app.use(movieRoutes)
  app.use(trailerRoutes)

  app.use((req, res) => {
    res.status(404).send({
      status: 404,
      error: 'Not Found',
      data: []
    })
  })

  app.listen(port, () => {
    console.log(`Started server on => http://localhost:${port} for Process Id ${process.pid}`)
  })

  // in case of an error
  app.on('error', (appErr, appCtx) => {
    console.error('app error', appErr.stack)
    console.error('on url', appCtx.req.url)
    console.error('with headers', appCtx.req.headers)
  })
}

/**
 * Setup server either with clustering or without it
 * @param isClusterRequired
 * @constructor
 */
const setupServer = (isClusterRequired) => {
  // if it is a master process then call setting up worker process
  if (isClusterRequired && cluster.isMaster) {
    setupWorkerProcesses()
  } else {
    // to setup server configurations and share port address for incoming requests
    setUpExpress()
  }
}

setupServer(true)
