const nodeMailer = require('../config/nodemailer');
const User = require('../models/users');

module.exports.sendMailOnIncidentCreation = function(incident, listOfEmailes){

    console.log("we are in node_cotroller incident creation");
    let htmlPage = nodeMailer.renderTemplate({incident_document : incident}, '/newIncident.ejs');

   
    //sending mails 
    nodeMailer.transporter.sendMail({
        from: 'manageincident@gmail.com', 
        to: listOfEmailes,
        subject: "Incident Status", 
        html: htmlPage, 
    },function(err, info){
        if(err){
            console.log("error in sending mail", err);
            return;
        }
        console.log('massage has been sent ', info);
        return;
    });
}


module.exports.sendMailOnIncidentUpdation = function(incident, listOfEmailes){
    console.log("we are in node_cotroller, updation ");
    let htmlPage = nodeMailer.renderTemplate({incident_document : incident}, '/updateIncident.ejs');
    

    //sending mails 
    nodeMailer.transporter.sendMail({
        from: 'manageincident@gmail.com', 
        to: listOfEmailes,
        subject: "Incident Status", 
        html: htmlPage, 
    },function(err, info){
        if(err){
            console.log("error in sending mail", err);
            return;
        }
        console.log('massage has been sent ', info);
        return;
    });
}

module.exports.getListOfMails = async function(){
    console.log("im here in getList of mails");
    const users = await User.find({});
    const incidentData = users.map((eachIncident) => {
        return {
            email: eachIncident.email
        }
    });
    console.log(incidentData);
    let listOfEmailes = [];
    for(let incident of incidentData){
        console.log(incident.email);
        listOfEmailes.push(incident.email);
    }
    return listOfEmailes;
}