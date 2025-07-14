import express, { urlencoded } from 'express';
import connectDB from './utils/db.js';
import dotenv from "dotenv";
import cors from "cors";
import leaderboard_routes from './routes/leaderboard_routes.js';
import point_routes from './routes/point_routes.js';
import path, { dirname } from 'path'


dotenv.config();
const PORT = process.env.PORT || 3000;
// Get the absolute path to the current directory
const __dirname=path.resolve();
const app = express();
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(urlencoded({extended:true}));

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname,"/Frontend/dist")));
 
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


// CORS configuration to allow requests from the frontend
const corsOptions={
    origin:process.env.URL,
    credentials:true
}

//Mount API routes for user and points
app.use(cors(corsOptions));
app.use("/user",leaderboard_routes);
app.use("/points",point_routes);


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
