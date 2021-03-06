require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

/**
 * Database setup
 */
mongoose.connect(
    process.env.MONGO_URL , 
    {
        userNewUrlParser: true,
        // useUnifiedTopology: true
    }
);

// mongoose.connect('mongodb://localhost:27017/upload', {
//   useNewUrlParser: true
// });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(require("./routes"));

app.listen(process.env.PORT || 3000);