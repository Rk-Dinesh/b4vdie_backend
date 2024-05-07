const express = require(`express`);
const cors = require("cors");
const body_parser = require("body-parser");

const Router = require("./routers/router");
const userrouter = require("./routers/user_router");
const adminrouter = require("./routers/admin_router");
const chatrouter = require("./routers/chat_router");
const clubrouter = require("./routers/club_router");
const clubpostrouter = require("./routers/clubpost_router");
const communitypostrouter = require("./routers/communitypost_router");
const cotravellerrouter = require("./routers/cotraveller_router");
const otprouter = require("./routers/otp_router");
const pitstoprouter = require("./routers/pitstop_router");
const transportrouter = require("./routers/transport_router");
const tripalertrouter = require("./routers/tripalert_router");
const triprouter = require("./routers/trip_router");

const app = express();

app.use(
  cors({
    "Access-Control-Allow-Origin": "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  })
);

app.use(express.static("img"));
app.use(body_parser.json());

app.use("/", Router);
app.use("/user", userrouter);
app.use("/admin", adminrouter);
app.use("/chat", chatrouter);
app.use("/club", clubrouter);
app.use("/clubpost", clubpostrouter);
app.use("/community", communitypostrouter);
app.use("/cotraveller", cotravellerrouter);
app.use("/otp", otprouter);
app.use("/pitstop", pitstoprouter);
app.use("/transport", transportrouter);
app.use("/tripalert", tripalertrouter);
app.use("/trip", triprouter);

module.exports = app;