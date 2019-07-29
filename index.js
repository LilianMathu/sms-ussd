const express = require('express');
const mongoose= require ('mongoose');
// const PhoneModel = require('./models')
const bodyParser = require('body-parser');
const morgan = require('morgan');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(morgan('dev'));


app.post('/send_sms', (req, res) => {
       let telephone_number= req.body.telephone_number;
        let sms_message= req.body.sms_message;
   
	
	const options = {
		username: 'lilianmathu',
		apiKey: 'ffa8ff999d4f5295f01ec6573a921b63def5be318ad1da2c38a92656a433838d'
	};

	// initialize africastalking gateway
	const africastalking = require('africastalking')(options);

	// sms object of africastalking package
	const sms = africastalking.SMS;

	// sending parameters
	const sending_options = {
		to: [telephone_number],
		message: sms_message,
	};

	// send sms
	sms.send(sending_options)
	.then(response => {
		console.log(response);
		res.send(response);
	})
	.catch(error => {
		console.log(error);
		res.send(error);
	});
});

const db = require('./keys').mongodbURI;
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
	})
	})
	.catch((error) => {
    console.log({ message: `Unable to establish a connection to the server ${error}` });
  });