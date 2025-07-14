import express, { urlencoded } from 'express';
import connectDB from './utils/db.js';
import dotenv from "dotenv";
import cors from "cors";
import leaderboard_routes from './routes/leaderboard_routes.js';
import point_routes from './routes/point_routes.js';
import path, { dirname } from 'path'


dotenv.config();
const PORT = process.env.PORT || 3000;
const __dirname=path.resolve();
const app = express();
app.use(express.json());
app.use(urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"/Frontend/dist")));
 
app.get('/', (req, res) => {
  res.send('Hello, World!');
});



const corsOptions={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions));
app.use("/user",leaderboard_routes);
app.use("/points",point_routes);


// app.get("*",(req,res)=>{
//   res.sendFile(path.resolve(__dirname,"Frontend","dist","index.html"))
// })
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
