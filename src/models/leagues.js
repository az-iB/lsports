"use strict";

import Bookshelf from "../config/mysql";
import "./sports.js";
import "./fixtures.js"
import "./locations.js"



class ModelLeagues extends Bookshelf.Model {
    initialize () {
        // defining events for validation and other stuff
        this.on("creating", (model, attrs, options) => {
            this.id = this.attributes.id; // because we are using custom id and to overwrite native properties
        }, this);
    }
    constructor () {
        super();
        Bookshelf.Model.apply(this, arguments);
    }
    get tableName() {
        return 'league';
    }

    get hasTimestamps() {
        return true;  // to add timestamps to table
    }

    get idAttribute () { return "id" }

    // Relations
    fixture () { return this.hasMany('ModelFixtures', 'league') }

    sport () { return this.belongsTo('ModelSport', 'sport') }

    location () { return this.belongsTo('ModelLocations', 'location') }

}

export default Bookshelf.model("ModelLeagues", ModelLeagues);
