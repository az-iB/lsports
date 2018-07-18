import mongoose from 'mongoose'
import { log, error } from 'console'

const {
  MONGODB_USER,
  MONGO_PORT,
  MONGODB_PASS,
  MONGO_HOST,
  MONGO_COLLECTION,
} = process.env

const options = {
  useMongoClient: true,
  promiseLibrary: Promise,
}

// Create mongo database connection

//server
// mongoose.connect(`mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_COLLECTION}`, options)

//localhost
mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_COLLECTION}`, options)

mongoose.connection.on('connected', () => log('[MongoDB] is connected on port', MONGO_PORT))
mongoose.connection.on('disconnected', () => error('[MongoDB] is disconnected'))
