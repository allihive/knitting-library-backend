import express from 'express';
import authRoutes from './modules/auth/auth.route.js'
import cors from "cors"
import rateLimit from 'express-rate-limit';
import yarnRoutes from './modules/yarn/yarn.routes.js'
import { errorHandler } from './modules/middleware/errorHandler.js';
import toolsRoutes from './modules/tools/tools.route.js'
import patternRoutes from './modules/patterns/patterns.route.js'

const app = express();

app.use((cors({
	origin: [
		"https://aliceli.dev", 
		"https://www.aliceli.dev"
	],
	credentials: true,
})))

app.use(express.json()); //parses incoming JSON request bodies

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: 'Too many attempts, please try again later.'
});


app.use('/auth', authLimiter, authRoutes);
app.use('/yarn', yarnRoutes);
app.use('/tools', toolsRoutes);
app.use('/pattern', patternRoutes);
app.use(errorHandler);


export default app;
