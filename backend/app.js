const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();

// routers
const userRouter = require("./routes/userRoute");
const quizRouter = require("./routes/quizRoute");
const questionRouter = require("./routes/questionRoute");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// routes
app.use("/api", userRouter);
app.use("/api", quizRouter);
app.use("/api", questionRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
