
import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true }
}, {
    timestamps: true
});

export default mongoose.model('User', UserSchema);