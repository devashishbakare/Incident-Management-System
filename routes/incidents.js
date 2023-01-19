const express = require('express');
const router = express.Router();

// const passport = require('passport');
const incidentController = require('../controllers/incident_controller');

router.post('/create-incident', incidentController.createIncident);
router.get('/display-template', incidentController.showTemplate);

module.exports = router;
