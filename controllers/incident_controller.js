const Incident = require('../models/incident');

module.exports.createIncident = function(req, res){
 
    console.log(req.body);
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
    
    console.log(req.query._id);
    console.log(req.query);
    console.log(req.query.id);

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

