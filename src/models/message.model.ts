
import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interface/user.interface';

import { ObjectId } from 'mongodb';
const MessageSchema: Schema = new Schema({
    message: { type: String, required: true },
    roomId: { type : ObjectId, ref: 'Room' },
    user: { type : ObjectId, ref: 'User' }
}, {
    timestamps: true
});

export default mongoose.model<IUser>('Meessages', MessageSchema);