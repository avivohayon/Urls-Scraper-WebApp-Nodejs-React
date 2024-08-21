require('dotenv').config(); 

const app = require('./app');
const port = process.env.PORT || 8008;

app.listen(port, () => console.log(` Server running on port ${port}`));
