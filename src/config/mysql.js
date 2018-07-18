import knex from 'knex'
import { log } from 'console'
import bookshelf from "bookshelf"
const upsert = require('bookshelf-upsert')



const {
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_PORT,
  MYSQL_HOST,
  MYSQL_CHARSET,
  NODE_ENV,
} = process.env

const db = knex({
  client: 'mysql', // Leave mysql client even for MariaDB
  connection: {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    charset: MYSQL_CHARSET,
  },
  pool: { min: 1, max: 100 },
  acquireConnectionTimeout: 10000
})

// Run a dummy query to check database connection
db.raw('select 1 + 1 as result').then(() => {
  if (NODE_ENV !== 'test') log(`${MYSQL_DATABASE} Database connected on port ${MYSQL_PORT}`)
})

const Bookshelf = bookshelf(db);
Bookshelf.plugin(upsert)

Bookshelf.plugin('registry');

export default Bookshelf
