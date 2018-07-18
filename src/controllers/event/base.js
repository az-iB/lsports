"use strict";

import HTTP from "../../helpers/httpcodes";
import { ModelError, ISE } from "../../helpers/error-handler"
import fs from 'fs'

// models used
import ModelFixtures from "../../models/fixtures"
import ModelParticipants from "../../models/participants"
import ModelLeagues from "../../models/leagues"
import ModelSport from "../../models/sports"

class Base {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {

        ModelFixtures.query(function (q) {
            q.distinct()
                .leftJoin('periods', function () {
                    this.on('fixture.id', '=', 'periods.fixture');
                })
                // .innerJoin('participants', function () {
                //     this.on('fixture.id', '=', 'participants.fixture');
                // })
                // .leftJoin('league', function () {
                //     this.on('fixture.league', '=', 'league.id');
                // })

        })
        .fetchAll({ withRelated: ['participant', 'period', 'league'] })
        .then(all_events => {
            if (all_events.length) {
                res.status(HTTP.OK).json({
                    message: "events found",
                    data: all_events.toJSON()
                });
            }
            else {
                res.status(HTTP.NOT_FOUND).json({ message: "No events found" })
            }
        })
        .catch((error) => { ISE(error, res) });
    }

}

export default Base;
