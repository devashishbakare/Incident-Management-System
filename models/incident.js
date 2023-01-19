const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect = require('../config/mongoose');

autoIncrement.initialize(mongoose.connection);

const incidentSchema = new mongoose.Schema({

  incidentNumber :{
    type : Number,
    required : true
  },
  incident_state: {
    type: String,
    enum: ['Open', 'On-hold', 'Closed'],
    required: true
  },
  date_of_occurrence: {
    type: Date,
    required: true
  },
  employee_id: {
    type: Number,
    required: true
  },
  start_time: {
    type: String,
  },
  end_time: {
    type: String,
  },
  issue_related_to: {
    type: String,
    enum: ['Plateform', 'Service', 'Teaching', 'Teaching-Assistance'],
    required: true
  },
  solution_group: {
    type: String,
    enum: ['Plateform-team', 'Service-team', 'Teaching-team'],
    required: true
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    required: true
  },
  follow_up_by: {
    type: String,
    required: true
  },
  impacted_count: {
    type: Number,
    required: true
  },
  additional_comment: {
    type: String
  },
  affected_module : {
    type : String
  }
}, {timestamps : true});


incidentSchema.plugin(autoIncrement.plugin, {
    model: 'Incident',
    field: 'incidentNumber',
    startAt: 1000,
    incrementBy: 1
});

const Incident = mongoose.model('Incident', incidentSchema);
module.exports = Incident;
