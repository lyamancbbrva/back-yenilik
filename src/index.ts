import dotenv from "dotenv";
import express from "express";
import { AppDataSource } from "./DAL/config/db";
import { v1Router } from "./routes";
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from "./swagger/swagger";
import cors from 'cors'

dotenv.config();

const app = express();

const corsOptions: cors.CorsOptions = {
	origin: 'https://yenilik.vercel.app',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

AppDataSource.initialize()
	.then(() => {
		console.log("✅ Database connection established");

		const port = process.env.PORT;
		app.use("/api/v1", v1Router);
		app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
		app.listen(port, () =>
			console.log(`🚀 Server is running on port ${port}`)
		);
	})
	.catch((error) => {
		console.error("❌ Error during Data Source initialization:", error);
		process.exit(1);
	});
