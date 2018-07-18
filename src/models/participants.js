"use strict";

import Bookshelf from "../config/mysql";
import "./fixtures.js";



class ModelParticipants extends Bookshelf.Model {
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
        return 'participants';
    }

    get hasTimestamps() {
        return true;  // to add timestamps to table
    }

    get idAttribute () { return "id" }

    fixture () { return this.belongsTo('ModelFixtures', 'fixture') }

}

export default Bookshelf.model("ModelParticipants", ModelParticipants);
