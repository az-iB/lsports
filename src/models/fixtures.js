"use strict";

import Bookshelf from "../config/mysql";
import "./participants.js";
import "./periods.js";


class ModelFixtures extends Bookshelf.Model {
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
        return 'fixture';
    }

    get hasTimestamps() {
        return true;  // to add timestamps to table
    }

    get idAttribute () { return "id" }

    participant () { return this.hasMany('ModelParticipants', 'fixture') }

    period () { return this.hasMany('ModelPeriods', 'fixture')}

    league () { return this.belongsTo('ModelLeagues', 'league') }

}

export default Bookshelf.model("ModelFixtures", ModelFixtures);
