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
            return res.json({ msg: "Incorrect Username or Password", status: false })
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid)
            return res.json({ msg: "Incorrect Username or Password", status: false })
        delete user.password
        return res.json({ status: true, user })
    } catch (ex) {
        next(ex)
    }
}

module.exports.setAvatar = async (req, res, next) => {
    try {
        const { id } = req.params
        const { avatarImage } = req.body
        const userData = await User.findByIdAndUpdate(id, { isAvatarImageSet: true, avatarImage })
        return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage })
    } catch (err) {
        next(err)
    }
}