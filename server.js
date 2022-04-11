
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Quest Log is live at PORT:${port}`)
});

app.use(express.static('public'));