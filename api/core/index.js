const express = require("express");

const app = express();

// Routes
app.get("/api/1", (req, res) => {
	res.json({
		number: 1,
	});
});

module.exports = app;
