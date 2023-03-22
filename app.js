"use strict";
require("dotenv").config();
const exp = require("express");
const bdy = require("body-parser");
const nodeMail = require("nodemailer");
const path = require("path");

const app = exp();
app.use(exp.static("public"));
const rootDir = __dirname + "/public";
app.use(bdy.urlencoded({ extended: true }));

// Main Message Method
async function mainMail(name, email, subject, message) {
	const transporter = await nodeMail.createTransport({
		service: "gmail",
		auth: {
			user: process.env.GMAIL_USER,
			pass: "aawciekejdveeqsp",
		},
	});
	const mailOption = {
		from: email,
		to: process.env.GMAIL_USER,
		subject: subject,
		html: `A new Enrollment is proceeded from 
    Email : ${email}
    Name: ${name}
    Message: ${message}`,
	};
	try {
		await transporter.sendMail(mailOption);
		return Promise.resolve("Message Sent Successfully!");
	} catch (error) {
		return Promise.reject(error);
	}
}

// Home Route
app.get("/", (req, res) => {
	res.render(index.html);
});

// Contact Route
app.get("/Contact", (req, res) => {
	res.sendFile(rootDir + "/contact.html");
});

// Course Route
app.get("/Course", (req, res) => {
	res.sendFile(rootDir + "/course.html");
});

// About Route
app.get("/About", (req, res) => {
	res.sendFile(rootDir + "/about.html");
});

// Service Route
app.get("/Service", (req, res) => {
	res.sendFile(rootDir + "/service.html");
});

// Posting the Req and Res from the User and the Mail Service Provider
app.post("/contact", async (req, res, next) => {
	const { yourname, youremail, yoursubject, yourmessage } = req.body;
	try {
		await mainMail(yourname, youremail, yoursubject, yourmessage);
		res.redirect("/Course");
		console.log(res.statusCode);
	} catch (error) {
		console.log(res.statusCode);
	}
});

app.listen(9090, () => {
	console.log("Server is hosted on Port 9090.");
});
