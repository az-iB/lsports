"use strict";

import HTTP from "../../helpers/httpcodes";
import { isID } from '../../helpers/validate';
import { ModelError, ISE } from "../../helpers/error-handler";
import Bookshelf from '../../config/mysql'
import async from 'async'

// models used
import ModelFixtures from "../../models/fixtures"
import ModelParticipants from "../../models/participants"
import ModelLeagues from "../../models/leagues"
import ModelSport from "../../models/sports"
import ModelPeriods from "../../models/periods"

var sendResponse = function (response, data)
{
    // console.log(res)
    if (data.length)
    {
        response.status(HTTP.OK).json({
            message: "data found",
            data: data
        });
    }
    else
    {
        response.status(HTTP.NOT_FOUND).json({ message: "No data found" })
    }
}

class IdParameter {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {

        // if (!isID(req.params.id)) res.status(HTTP.BAD_REQUEST).json({ message: "Invalid ID" });
        var data = [];
        let result = [];
				if (req.params.league) {
          let rawSql = 'SELECT fixture.id, fixture.start, league.name as league, league.current_season, GROUP_CONCAT(participants.name) as teams, locations.name as location, sports.name as sport, periods.type,periods.finished, periods.confirmed,GROUP_CONCAT(results.position) as positions, GROUP_CONCAT(results.value) as scores FROM `fixture` LEFT JOIN periods on periods.fixture = fixture.id LEFT JOIN results on results.period = periods.id LEFT JOIN participants on participants.fixture = fixture.id LEFT JOIN league on league.id = fixture.league LEFT JOIN locations on locations.id = league.location LEFT JOIN sports on sports.id = league.sport WHERE participants.name IS NOT NULL AND (league.id = '+ req.params.league + ' AND sports.id = ' + req.params.sport + ') GROUP BY fixture.id';
          Bookshelf.knex.raw(rawSql).then(result => {
            sendResponse(res, result)
          });
				} else {
					ModelSport.query(function (q) {
	            q.distinct()
	                .innerJoin('league', function () {
	                    this.on('sports.id', '=', 'league.sport')
	                })
									.where('sports.id', req.params.sport)
	        })
	        .fetchAll({ withRelated: ['league'] })
	        .then(sports => {
	            if (sports.length) {
	                res.status(HTTP.OK).json({
	                    message: "sports found",
	                    data: sports.toJSON()
	                });
	            }
	            else {
	                res.status(HTTP.NOT_FOUND).json({ message: "No sports found" })
	            }
	        })
	        .catch((error) => { ISE(error, res) });
				}


    }
}

export default IdParameter;
