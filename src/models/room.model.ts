
import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interface/user.interface';

import { ObjectId } from 'mongodb';
const RoomSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    friends: [{ type : ObjectId, ref: 'User' }],
}, {
    timestamps: true
});

export default mongoose.model('Room', RoomSchema);