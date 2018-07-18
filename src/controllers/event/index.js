"use strict";

import Base from "./base";

import IdParameter from "./id-parameter";

import Sport from "./sport";


module.exports = (router) => {

    // middleware for this route only
    router.use('/events', (req, res, next) => next() );

    // all the routes related to '/events'

    const base = new Base();
    router.route('/events')
        .all(base.all) // open route
        .get(base.get); // fetch all events

    const idParameter = new IdParameter();
      router.route('/events/:sport/:league?')
        .get(idParameter.get) // fetch single user by id

    const sport = new Sport();
      router.route('/sports')
        .get(sport.get) // fetch single user by id
};
