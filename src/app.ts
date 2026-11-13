import express, { Request, Response } from 'express';
import productoRoutes from './routes/producto.routes.js';
import userRoutes from './routes/user.routes.js';
import ventaRoutes from "./routes/venta.routes.js";

const app = express();

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', productoRoutes);
app.use('/api', ventaRoutes)

app.get('/api/status', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'API working correctly' });
});

export default app;
