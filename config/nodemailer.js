const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service : "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'manageincident@gmail.com', // generated ethereal user
      pass: 'fkanoribivjsmroc', // generated ethereal password
    },
 });

 let renderTemplate = function(data, relativePath){
    
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){ console.log(err, "Not able to render template"); return;}
            mailHTML = template;
        }
    );
    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}
