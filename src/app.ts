import express from 'express';
import shipmentRoutes from "./routes/shipment.route.js";
import packageRoutes from "./routes/package.route.js";
import trackingHistoryRoutes from "./routes/trackingHistory.route.js";

const app = express();

app.use(express.json());
app.use('/api', shipmentRoutes);
app.use('/api', packageRoutes);
app.use('/api', trackingHistoryRoutes);

export default app;
