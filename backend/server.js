
const express = require('express');
const moongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');


require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const port = process.env.PORT || 4000;

app.use(express.json());

const DB_uri = process.env.ATLAS_URI;
moongoose.connect(DB_uri);
const connection = moongoose.connection;
connection.once('open', () => { console.log("Mongo DB connection established sucessfully") });

const ContactUsRouter = require('./routes/ContactUs.route');
const AboutUsRouter = require('./routes/AboutUs.route');
const TeamMembersRouter = require('./routes/TeamMembers.route');
const ForSalePropertiesRouter = require('./routes/ForSaleProperties.route');
const ForRentPropertiesRouter = require('./routes/ForRentProperties.route');
const SubmittedPropertyRequestsRouter = require('./routes/SubmittedPropertyRequests.route');

app.use('/ContactUs', ContactUsRouter);
app.use('/AboutUs', AboutUsRouter);
app.use('/TeamMembers', TeamMembersRouter);
app.use('/ForSaleProperties', ForSalePropertiesRouter);
app.use('/ForRentProperties', ForRentPropertiesRouter);
app.use('/SubmittedPropertyRequests', SubmittedPropertyRequestsRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});