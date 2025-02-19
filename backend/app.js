const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();

// routers
const userRouter = require("./routes/userRoute");
const quizRouter = require("./routes/quizRoute");
const questionRouter = require("./routes/questionRoute");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// routes
app.use("/api", userRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/question", questionRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
