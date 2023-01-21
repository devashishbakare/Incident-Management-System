const express = require('express');
const router = express.Router();

// const passport = require('passport');
const incidentController = require('../controllers/incident_controller');

router.post('/create-incident', incidentController.createIncident);
router.get('/display-template', incidentController.showTemplate);
router.get('/show-all-incident', incidentController.showAllIncidents);
router.get('/open-incident/:id', incidentController.showIncident);
router.get('/edit/:id', incidentController.editIncident);
router.post('/update-incident/:id', incidentController.updateIncident);
router.post('/search', incidentController.searchIncident);
module.exports = router;
