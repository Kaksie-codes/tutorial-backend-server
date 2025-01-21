import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
    role: {
        type: String,
        enum:['user', 'admin'],
        default: 'user'
    },
    isGoogleAuthenticated:{
        type: Boolean,
        default: false
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    lastLoggedIn:{
        type: Date,
        default: Date.now()
    },
    totalAmountSpent: {
        type: Number,
        default: 0
    },
    joinedAt: {
        type: Date,
        default: Date.now()
    },
},{
    timeStamps: true
}
)

const User = mongoose.model('User', userSchema);
export default User;