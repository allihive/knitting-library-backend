import express from 'express';
import authRoutes from './modules/auth/auth.route.js'
import cors from "cors"
import rateLimit from 'express-rate-limit';


const app = express();

app.use((cors({
	origin: "https://aliceli.dev",
	credentials: true,
})))

app.use(express.json()); //parses incoming JSON request bodies

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: 'Too many attempts, please try again later.'
});


app.use('/auth', authLimiter, authRoutes);


export default app;
