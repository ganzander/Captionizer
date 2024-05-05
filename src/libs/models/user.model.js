const { Schema, model, models } = require("mongoose");


const userSchema = new Schema({
    username:{
        type : String,
        // required : true
    },
    email:{
        type : String,
        // required : true
        unique : true
    },
    id :{
        type : String,
        unique : true
    },
    videos :{
        type : [String],
    }
})

const User = models?.User || model("User", userSchema)
export default User