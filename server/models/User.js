import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userScheme = new mongoose.Schema({
    name: {
        type:String,
        required: true 
    },
    email: {
        type:String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type:String,
        required: true 
    },
    isAdmin: {
        type:Boolean,
        default: false
    }
}, {timestamps: true}
)


userScheme.methods.matchPasswords = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userScheme.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next()
    }


    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userScheme)
export default User 