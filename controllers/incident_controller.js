const Incident = require('../models/incident');

module.exports.createIncident = function(req, res){

    const newIncident = new Incident({
        incident_state: req.body.incident_state,
        date_of_occurrence: req.body.date_of_occurrence,
        employee_id: req.body.employee_id,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        issue_related_to: req.body.issue_related_to,
        solution_group: req.body.solution_group,
        priority: req.body.priority,
        follow_up_by: req.body.follow_up_by,
        impacted_count: req.body.impacted_count,
        additional_comment: req.body.additional_comment,
        affected_module: req.body.affected_module
    });
    newIncident.save((err, incident) => {
        if (err) {
            console.log(err+"error in creating a document");
            return;
        } else {
            console.log("document added succesfully");
            let id = incident._id;
            console.log(id+"createId");
            return res.redirect(`/incidents/display-template/?id=${incident._id}`);
        }
    });
   
}

module.exports.showTemplate = async function(req, res){
    
    try{
        let incident = await Incident.findById(req.query.id);
        
        console.log("Here we are rendering the page");
        return res.render("incident_details",{
            title : "Incident Details",
            incident_document : incident
        });


    }catch(err){
        console.log("error while fetching incident from param");
        return;
    }
}

module.exports.showAllIncidents = async function(req, res){

    try{
        const incidents = await Incident.find({});
        const incidentData = incidents.map((incident) => {
    return {
        incidentNumber: incident.incidentNumber,
        incident_state: incident.incident_state,
        issue_related_to: incident.issue_related_to,
        priority: incident.priority,
        createdAt: incident.createdAt
    }
        });
        incidentData.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        res.render('all_incident', { incidents: incidentData });
    }catch(err){
        console.log(err+" there is error while iterating over schema");
        return;
    }
   
}

module.exports.showIncident = async function(req, res){
   
    try{
        let incident = await Incident.findOne({incidentNumber: req.params.id});
    
        if(incident){
            return res.render('incident_details',{
                incident_document : incident
            });
        }else{
            console.log(err+'incident not found from id');
            return;
        }
    }catch(err){
        console.log(err+"Error while displaying indivisual template");
        return;
    }
}

module.exports.editIncident = async function(req, res){

    
    try{
            let incident = await Incident.findOne({incidentNumber: req.params.id});
            if(incident){   
                return res.render("edit_incident",{
                    incident_document: incident
                });
            }else{
                console.log("incident not found");
                return;
            }
    }catch(err){
        console.log(err+"error while fetching incident that comming from edit incident route");
        return;
    }

}

module.exports.updateIncident = async function(req, res){
   
    const update = req.body;
    try{
        let incident = await Incident.findOne({incidentNumber: req.params.id});
            if(incident){   

                Incident.findOneAndUpdate({incidentNumber: req.params.id}, update, {new: true} , function(err, incident){
                    if(err){
                        console.log(err+"error while updating the document");
                        return;
                    }else{
                        console.log("incident has been updated successfully");
                        return res.render("incident_details",{
                            incident_document: incident
                        });
                    }
            });
            }else{
                console.log("incident not found");
                return;
            }
    }catch(err){
        console.log(err+"error while fetching incident that comming from edit incident route");
        return;
    }
}

module.exports.searchIncident = async function(req, res){
    console.log("req coming here in seach incident");
    
    try{
        let incident = await Incident.findOne({incidentNumber: req.body.incidentNumber});
        if(incident){
            return res.render('search_result',{
                incidents: incident
            });
        }
    }catch(err){
        console.log(err+"error while fetching the incident form req info");
        return;
    }

}