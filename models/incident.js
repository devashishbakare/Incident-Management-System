const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({

  incident_state: {
    type: String,
    enum: ['open', 'on-hold', 'closed'],
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
  appointment_time: {
    type: Date,
    required: true
  },
  issue_related_to: {
    type: String,
    enum: ['platefomr', 'service', 'teaching', 'teaching-assistance'],
    required: true
  },
  solution_group: {
    type: String,
    enum: ['plateform-team', 'service-team', 'teaching-team'],
    required: true
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
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
  }
}, {timestamps : true});

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;
