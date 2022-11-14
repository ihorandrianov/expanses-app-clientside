import express from 'express';
import { join } from 'path';
const app = express();

app.use(express.static(join(__dirname, 'dist')));

// PATH CONFIGURATION TO RESPOND TO A REQUEST TO STATIC ROUTE REQUEST BY SERVING index.html
app.get('/*', function (req, res) {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.PORT);
