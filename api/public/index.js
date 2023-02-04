const express = require("express");

const app = express();

// Routes
app.get("/api/2", (req, res) => {
	res.json({
		number: 2,
	});
});

module.exports = app;
