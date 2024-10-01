// Import User model
const User = require('../models/user');


//TO get all users
exports.getAllUsers = async (req, res) => {
    const dbAllUser = await User.find({});
    return res.status(200).send(dbAllUser)
}

// TO find user as per their userID
exports.findUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).send("Error User not found");
    } else {
        return res.status(200).json(user);
    }
}

// TO update user as per their userID
exports.updateUserById = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, { firstname: "Ritik" });
    if (!user) {
        return res.status(404).send("Error User not found");
    } else {
        return res.status(203).json(user);
    }
}

// TO delete user as per their userID
exports.deleteUserById = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).send("Error User not found");
    } else {
        return res.status(200).send("User Deleted");
    }
}