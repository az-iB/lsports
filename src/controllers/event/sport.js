"use strict";

import HTTP from "../../helpers/httpcodes";
import { ModelError, ISE } from "../../helpers/error-handler"
import fs from 'fs'

// models used
import ModelSport from "../../models/sports"

class Sport {

    all (req, res, next) { next() }

    // GET request
    get (req, res) {
      ModelSport.query(function (q) {
          q.distinct()
      })
      .fetchAll({ columns: ['id', 'name'], withRelated: ['league'] })
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

export default Sport;
