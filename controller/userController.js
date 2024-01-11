import User from "../model/userModel.js";

export const fetch = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ msg: 'User not found' })
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const create = async (req, res) => {
    try {
        const userData = new User(req.body);
        const { email } = userData;
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json('Email already in use');
        }
        const savedUser = await userData.save();
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id: id })
        if (!userExist) {
            return res.status(404).json("No user with this ID")
        }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findOne({ _id: id })
        if (!userExist) {
            return res.status(404).json("No user with this ID")
        }
        await User.remove({ _id: id });
        res.status(201).json({ massage: "The account has been deleted" });
        
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}