
import mongoose, { Schema } from 'mongoose';
const RoomSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
}, {
    timestamps: true
});

export default mongoose.model('Room', RoomSchema);