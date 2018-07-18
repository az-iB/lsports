"use strict";

import Bookshelf from "../config/mysql";



class ModelScoreboards extends Bookshelf.Model { 
    initialize () {
        // defining events for validation and other stuff
        // this.on("creating", (model, attrs, options) => {
        //     this.id = this.attributes.ID; // because we are using custom id and to overwrite native properties
        // }, this);
    } 
    constructor () {
        super();
        Bookshelf.Model.apply(this, arguments);
    }
    get tableName() {
        return 'scoreboard';
    }

    get hasTimestamps() {
        return true;  // to add timestamps to table
    }

    get idAttribute () { return "id" }

}

export default Bookshelf.model("ModelScoreboards", ModelScoreboards);