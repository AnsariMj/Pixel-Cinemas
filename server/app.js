const express = require("express");
const dbConnect = require("./database/dbConnect");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();
const app = express();
const movieCardRouter = require("./routes/movieCardRoutes");
const authRoute = require("./routes/authRoute");
const timingRoute = require("./routes/timingRoute");
const seatRoute = require("./routes/seatRoute");
const paymentRoute = require("./routes/paymentRoute");
const bannerRoute = require("./routes/bannerRoute")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: [
    "https://ticket-client.vercel.app",
    "http://localhost:5173"
  ]
}))
dbConnect();

app.get("/", (req, res) => {
  res.json("Server is running");
});
app.use("/api/v2/movie", movieCardRouter);
app.use("/api/v2/auth", authRoute);
app.use("/api/v2/timing", timingRoute);
app.use("/api/v2/seat", seatRoute);
app.use("/api/v2/payment", paymentRoute);
app.use("/api/v2/banner", bannerRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
