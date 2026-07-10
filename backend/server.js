
const dotenv = require('dotenv');

const connectDB = require('./src/config/database')

dotenv.config();

const server = require('./src/app')

connectDB();

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})