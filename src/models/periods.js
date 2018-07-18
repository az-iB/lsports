"use strict";

import Bookshelf from "../config/mysql";



class ModelPeriods extends Bookshelf.Model {
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
        return 'periods';
    }

    get hasTimestamps() {
        return true;  // to add timestamps to table
    }

    get idAttribute () { return "id" }

    result () { return this.hasMany('ModelResults', 'period')}
    fixture () { return this.belongsTo('ModelFixtures', 'fixture') }

}

export default Bookshelf.model("ModelPeriods", ModelPeriods);
