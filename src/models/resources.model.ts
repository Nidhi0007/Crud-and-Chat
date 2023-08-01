import mongoose, { Schema } from 'mongoose';

const ResourcesSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },

},{
    timestamps:true
});

export default mongoose.model('Resources', ResourcesSchema);