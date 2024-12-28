const mongoose = require('mongoose'); // Correct the typo

module.exports = async () => {
    const mongouri = 'mongodb+srv://harshbagoria:harsh8810@cluster0.t4iw5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

    try {
        const connect = await mongoose.connect(mongouri, {
            // Options are no longer required in the latest versions of mongoose
        });
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
