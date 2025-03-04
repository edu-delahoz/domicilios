const User = require("../../domain/models/User");

const updateUserRole = async (req, res) => {
    try {
        const { email, newRole } = req.body;

        const validRoles = ["owner", "admin", "domiciliary", "customer"];
        if (!validRoles.includes(newRole)) {
            return res.status(400).json({ message: "Invalid role." });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        user.role = newRole;
        await user.save();

        return res.json({ message: "Role updated successfully.", user });
    } catch (error) {
        return res.status(500).json({ message: "Error updating role.", error: error.message });
    }
};

module.exports = {updateUserRole};
