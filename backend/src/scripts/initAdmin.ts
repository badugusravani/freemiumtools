import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';

dotenv.config();

const initAdmin = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB Atlas');

    // Check if admin user exists
    const adminExists = await User.findOne({ username: 'admin' });
    
    if (!adminExists) {
      // Create admin user
      const admin = new User({
        username: 'admin',
        password: 'admin123', // This will be hashed by the pre-save hook
        isAdmin: true,
      });

      await admin.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error initializing admin user:', error);
    process.exit(1);
  }
};

initAdmin(); 