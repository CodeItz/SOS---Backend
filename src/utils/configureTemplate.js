const { resolve } = require("path");
const nodemailerhbs = require("nodemailer-express-handlebars");
const exphbs = require("express-handlebars");

module.exports = function(transporter){

  console.log('teste');

  const viewPath = resolve(__dirname, '..', 'views', 'emails');
  transporter.use('compile', nodemailerhbs({
    viewEngine: exphbs.create({
      layoutsDir: resolve(viewPath, 'layouts'),
      partialsDir: resolve(viewPath, 'partials'),
      defaultLayout: 'default',
      extname: '.hbs'
    }),
    viewPath,
    extName:'.hbs'
  }));
}