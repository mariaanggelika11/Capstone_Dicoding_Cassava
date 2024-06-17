import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import OrderRoute from "./routes/OrderRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import PetaniRoute from "./routes/PetaniRoute.js";
import LogistikRoute from "./routes/LogistikRoute.js";
import PabrikRoute from "./routes/PabrikRoute.js";
import PerusahaanRoute from "./routes/PerusahaanRoute.js";
import SearchRoute from "./routes/SearchRoute.js";

dotenv.config();
const app = express();
app.use("/profile", express.static("uploads/img/profile"));

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

(async () => {
  try {
    await db.sync();
    console.log("All models were synchronized successfully.");
    await store.sync();
    console.log("Session store synchronized");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
})();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(OrderRoute);
app.use(AuthRoute);
app.use(PetaniRoute);
app.use(LogistikRoute);
app.use(PabrikRoute);
app.use(SearchRoute);
app.use(PerusahaanRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server up and running... at http://localhost:${process.env.APP_PORT}`);
});
