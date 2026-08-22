import express from 'express';
import authRoutes from './modules/auth/auth.route.js'
import cors from "cors"


const app = express();

app.use((cors({
	origin: "http://localhost:5173",
	credentials: true,
})))

app.use(express.json()); //parses incoming JSON request bodies
app.use('/auth', authRoutes);

app.listen(5001, () => console.log("Server running on port 5001"))

export default app;
