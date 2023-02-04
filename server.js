const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
// const fetch = require("node-fetch");
const { mongo_db } = require("./config/config");

const app = express();

/*
let url = "http://localhost:3000/api/hub/create";

let options = {
    method: "POST",
	headers: { "Content-Type": "application/json", name: "Parcel V2" },
};

fetch(url, options)
.then((res) => res.json())
.then((json) => console.log(json))
.catch((err) => console.error("error:" + err));
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;
server = http.createServer(app);

// MongoDB
mongoose
	.connect(
		`mongodb+srv://lenacd:${mongo_db}@testing-database.5bj1ur1.mongodb.net/?retryWrites=true&w=majority`
	)
	.then(() => {
		mongoose.set("strictQuery", true);
		console.log("MongoDB Connected");
	})
	.catch((e) => console.log("[API Error]: ", e));

// Routes
app.use("/papi", require("./api/public/index")).use(
	"/api",
	require("./api/core/index")
);

// 404 & 500 Error Handling
app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

// Server starting
server.listen(PORT, () =>
	console.log(`Kyro API is running on port ${PORT}...`)
);
