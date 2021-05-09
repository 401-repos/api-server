'use strict';


class collection {
    constructor(model) {
        this.model = model;
    }

    read(id) {
        if (id) {
            return this.model.findById(id)
        } else {
            return this.model.find();
        }
    }
    readByCond(cond) {
        return this.model.find(cond)
    }
    add(obj) {
        const record = new this.model(obj);
        return record.save();
    }
    update(id, record) {
        return this.model.findByIdAndUpdate(id, record, {
            new: true
        });
    }
    delete(id) {
        return this.model.findByIdAndDelete(id);
    }

}
module.exports = collection;