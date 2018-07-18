"use strict";

import Bookshelf from "../config/mysql";



class ModelProvider extends Bookshelf.Model { 
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
        return 'providers';
    }

    get hasTimestamps() {
        return true;  // to add timestamps to table
    }

    get idAttribute () { return "id" }

}

export default Bookshelf.model("ModelProvider", ModelProvider);