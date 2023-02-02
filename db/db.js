import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();
const connectionString = process.env.CONNECTION_STRING;
// Connect to MongoDB
mongoose.connect(`${connectionString}`, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established');
});
// Set up body parser middleware

// Define a schema for the documents in the collection
const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    projectlink: {
        type: String,
        required: true,
    },
    
    versionKey: false
});

// Create a model from the schema
const Item = mongoose.model('Item', itemSchema);

export { Item };