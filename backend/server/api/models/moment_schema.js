"use strict"
var mongoose = require('mongoose');

var momentSchema = new mongoose.Schema({
    title: { type: String },
    imagePath: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tags: {type: Array, default: []},
    is_deleted: { type: Boolean , default: false}
},{
    timestamps: true
});

var moment = mongoose.model('moment', momentSchema);
module.export = moment;