import express from 'express';
import authRoutes from './modules/auth/auth.route.js'


const app = express();

app.use(express.json()); //parses incoming JSON request bodies
app.use('/auth', authRoutes);

export default app;
