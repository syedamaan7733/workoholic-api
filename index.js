const express = require("express");
const connectDB = require("./connect/connectDB");
require("dotenv").config();

// initializing app
const app = express();

// middleware imports
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// routes imports
const authRoute = require("./routes/auth.route");
const employeeRoute = require("./routes/employee.route");

// middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://neon-kheer-10511f.netlify.app",
      "https://workholi.netlify.app",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://192.168.162.84:5173",
      "http://172.18.128.1:5173",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
    ],
  })
);

// health endpoint
app.get("/", (req, res) => {
  res.send(`
            <head>
    <style>
        body {
            background-color: #000;
            color:rgb(84, 190, 14);
            font-family: 'Courier New', monospace;
            height: 100vh;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
        }

        h1 {
            font-size: 3rem;
            margin-bottom: 20px;
        }

        .cursor {
            display: inline-block;
            width: 5px;
            height: 15px;
            background-color: #0f0;
            margin-left: 5px;
            animation: blink 1s infinite;
        }

        @keyframes blink {
            0%, 49% {
                opacity: 1;
            }
            50%, 100% {
                opacity: 0;
            }
        }

        .matrix-bg {
            opacity: 0.1;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            background: repeating-linear-gradient(
                0deg,
                rgba(0, 255, 0, 0.15) 0px,
                rgba(0, 255, 0, 0.15) 1px,
                transparent 1px,
                transparent 2px
            );
        }
    </style>
</head>
<body>
    <div class="matrix-bg"></div>
    <div class="container">
        <h1>Welcome to WorkHolic API</span></h1>
        <h4>We are ready to serve....<span class="cursor"></span></h4>
    </div>
</body>
        `);
});

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/emp", employeeRoute);

// --------------- x ---------------
const port = process.env.PORT || 8080;

const init_ = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, async () => {
      console.log(`Server is listening on ${port}`);
    });
  } catch (error) {
    console.log("Something went wrong with the server.");
  }
};

init_();
