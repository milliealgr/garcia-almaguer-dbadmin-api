import 'dotenv/config';
import app from './app.js';
import { connectDatabase } from './config/db.js';

const PORT = process.env.PORT || 3000;

await connectDatabase();

app.listen(PORT, () => {
  console.log(`server running in http://localhost:${PORT}`);
});
