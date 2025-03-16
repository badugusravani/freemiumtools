import mongoose from 'mongoose';

export interface IAd extends mongoose.Document {
  name: string;
  position: string;
  code: string;
  isActive: boolean;
}

const adSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export const Ad = mongoose.model<IAd>('Ad', adSchema); 