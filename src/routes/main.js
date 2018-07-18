import express from 'express'
import async from 'async'
import Bookshelf from '../config/mysql'
import sports from '../controllers/sports'
import locations from '../controllers/locations'
import leagues from '../controllers/leagues'
import events from '../controllers/events'
import scriptGeter from '../middlewares/scriptgeter'
import urls from '../config/urls.json'
var path = require('path')

const router = express.Router();
let params = {};
if (urls) {
	async.forEachOf(urls, (uri, key, callback) => {
		(async (url) => {
      let params = 'az';
      let data= {};
      if (uri.model === 'events') {
        data = await scriptGeter(url, uri.model);
				data = JSON.parse(data);
      }

				if (data.Body) {
					let saved;
					switch (uri.model) {
							case 'sport':
								saved = await sports(data.Body)
								break
							case 'locations':
								saved = await locations(data.Body)
								break
							case 'leagues':
								saved = await leagues(data.Body)
								break
							case 'bookmakers':
								saved = ''
								break
							case 'markets':
								saved = ''
								break
							case 'events':
								saved = await events(data.Body);
								break;
						}
						if (data.Errors) {
							console.log(data.Errors)
						}
				} else {
          console.log('data empty')
        }
		})(uri.url)
	}, err => {
	    if (err) console.error(err.message);
	    // configs is now a map of JSON data
	    doSomethingWith(configs);
	});
}

// (async () => {
//   let saved;
  // let rawSql = 'SELECT GROUP_CONCAT(id) AS ids FROM sports';
  // params.sport = await Bookshelf.knex.raw(rawSql).then((result) => {
  //   return result[0][0].ids;
  // })
  // let rawSql2 = 'SELECT GROUP_CONCAT(id) AS ids FROM league';
  // params.league = await Bookshelf.knex.raw(rawSql).then((result) => {
  //   return result[0][0].ids;
  // })
  // if (params.sport && params.league) {
    // let data = await scriptGeter('http://prematch.lsports.eu/OddService/GetEvents', 'events', params);
    // console.log(data)
    // if (data.Body) {
    //   console.log('azol')
    //   saved = await events(data.Body);
      // var CronJob = require('cron').CronJob;
      // new CronJob('0 0 */3 * * *', function() {
      //   let data = scriptGeter('http://prematch.lsports.eu/OddService/GetEvents', 'events', params);
      //   if (data) events(data.Body);
      // }, null, true, 'America/Los_Angeles');
//     }
//
//   // }
// })()


router.get('/', (req, res) => {
  res.sendFile(path.resolve('index.html'))
})

export default router
