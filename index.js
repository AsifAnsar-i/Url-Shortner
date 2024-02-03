const express = require("express");
const urlRoute = require("./routes/url");
const connectToMongoDB = require("./connect");
const URL = require("./models/url");


const app = express();

app.use(express.json());
const port = 3000;

connectToMongoDB(
  "mongodb+srv://user:user@cluster0.irwoo4u.mongodb.net/urlShortner?retryWrites=true&w=majority"
);

app.use("/url", urlRoute);

app.get("/analytics/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    return res.json({
        totalclicks: entry.visitHistory.length,
        visitHistory: entry.visitHistory,
    });
    }
);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// MONGO=mongodb+srv://user:user@cluster0.irwoo4u.mongodb.net/urlShortner?retryWrites=true&w=majority
