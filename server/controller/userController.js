const User = require('../model/userModel')
const bcrypt = require('bcrypt')

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const userCheck = await User.findOne({ username })
        if (userCheck)
            return res.json({ message: 'Username already exists', status: false })
        const emailCheck = await User.findOne({ email })
        if (emailCheck)
            return res.json({ message: 'Email already exists', status: false })

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })
        delete user.password
        return res.json({ status: true, user })
    } catch (err) {
        next(err)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user)
            return res.json({ message: 'Username not found', status: false })
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.json({ message: 'Password is incorrect', status: false })
        delete user.password
        return res.json({ status: true, user })
    } catch (error) {
        next(error)
    }
}

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage,
            },
            { new: true }
        );
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (ex) {
        next(ex)
    }
};