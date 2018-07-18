"use strict";

import Bookshelf from "../config/mysql";
import "./leagues.js";



class ModelLocations extends Bookshelf.Model {
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
        return 'locations';
    }

    get hasTimestamps() {
        return true;  // to add timestamps to table
    }

    get idAttribute () { return "id" }

    // Relations
    league () { return this.hasMany('ModelLeagues', 'location') }

}

export default Bookshelf.model("ModelLocations", ModelLocations);
