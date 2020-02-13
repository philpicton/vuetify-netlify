
const dotenv = require('dotenv') // require the .env file for api key etc (on netlify set the env variables in the UI)
dotenv.config()
const postmark = require("postmark"); // require mail service

const client = new postmark.ServerClient( process.env.POSTMARK_API_KEY ) // your postmark api key in a .env file
const fromEmail = process.env.POSTMARK_FROM_EMAIL // the from and to email is the same in this example 
const headers = {
    "Access-Control-Allow-Origin": "*", // better change this for production
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type"
};

exports.handler = function (event, context, callback) {
    // only allow POST requests
    if (event.httpMethod !== "POST") {
        return callback(null, {
            statusCode: 410,
            body: JSON.stringify({
                message: 'Only POST requests allowed.',
            }),
        });
    }

    // parse the body to JSON so we can use it in JS
    const payload = JSON.parse(event.body);

    // validate the form
    if (
        !payload.name ||
        !payload.phone ||
        !payload.email ||
        !payload.checkbox ||
        !payload.message
    ) {
        return callback(null, {
            statusCode: 422,
            headers,
            body: JSON.stringify({
                message: 'Required information is missing.',
            }),
        });
    }

    // finally everything is fine and we can send the mail
    return client.sendEmail({
        "From": fromEmail,
        "To": fromEmail,
        "ReplyTo": payload.email,
        "Subject": `Contact Form Submitted by ${payload.name} `,
        "TextBody": `
      Hey Phil,

      ${payload.name} sent a new message from your website!

      Phone: ${payload.phone}

      Email: ${payload.email}

      Message: 
      
      ${payload.message}

      Cheers, your webserver!
    `
    }, (err ) => {
        // if there happenend an error on the postmark side we send a 500 error to the client
        if (err) {
            return callback(null, {
                statusCode: 500,
                body: JSON.stringify({
                    message: "Internal Server Error: " + err,
                })
            });
        }
        // if everything was fine we send status code 200
        return callback(null, {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                message: "Thank you for your message!",
            }),
        });
    });
}