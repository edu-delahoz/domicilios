const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../domain/models/User");
const { Op } = require("sequelize");
const RefreshToken = require("../../domain/models/RefreshToken");

class AuthController{

    async register(req, res){
        try{
            const {username, email, password} = req.body;
            
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [{ email }, { username }]
                }
            });
            
            if (existingUser) {
                return res.status(400).json({ message: "The email or username is already in use." });
            }
        
            const user = await User.create({username, email, password});
            const { password: _, ...userWithoutPassword } = user.toJSON();
            return res.status(201).json({
                message: "User created successfully.",
                user: userWithoutPassword
              });
        }catch (error){
            return res.status(500).json({
                message: "Error registering user",
                error: error.message
            });
        }
    }
    async login(req, res){
        try{
            const { email, password } = req.body;
            const user = await User.findOne({where: {email}});
            if(!user){
                return res.status(404).json({message: "User not found."});
            }

            const isValid = await bcrypt.compare(password, user.password);
            if(!isValid){
                return res.status(401).json({message: "Invalid credentials."});
            }

            const accessToken = jwt.sign(
                {id: user.id, email: user.email, role: user.role},
                process.env.JWT_SECRET,
                {expiresIn: "1h"}
            );

            const refreshToken = jwt.sign(
                { id: user.id },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: "7d" }
              );
            
            const expires = new Date();
            expires.setDate(expires.getDate() + 7);
            
            await RefreshToken.create({
                token: refreshToken,
                userId: user.id,
                expires: expires
              });
        
          
            return res.json({
                message: "successful login.",
                accessToken,
                refreshToken
            });
            
        }catch (error){
            return res.status(500).json({
                message: "Error login user",
                error: error.message
            });
        }
    }
    async getMe(req, res) {
        try {
            const user = await User.findByPk(req.user.id, {
                attributes: { exclude: ["password"] },
            });
    
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
    
            return res.json(user);
        } catch (error) {
            return res.status(500).json({
                message: "Error retrieving user data",
                error: error.message,
            });
        }
    }
    async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
              return res.status(401).json({ message: "Refresh token is required." });
            }
      
            const savedToken = await RefreshToken.findOne({ where: { token: refreshToken } });
            if (!savedToken) {
              return res.status(401).json({ message: "Refresh token not found." });
            }
      
            if (new Date() > savedToken.expires) {
              return res.status(401).json({ message: "Refresh token expired." });
            }
      
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
              if (err) {
                return res.status(401).json({ message: "Invalid refresh token." });
              }
              const user = await User.findByPk(decoded.id);
              if (!user) {
                return res.status(404).json({ message: "User not found." });
              }
              const newAccessToken = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
              );
              return res.json({ accessToken: newAccessToken });
          });
        } catch (error) {
          return res.status(500).json({ message: "Error refreshing token.", error: error.message });
        }
      }
      async logout(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({ message: "Refresh token is required." });
            }

            const tokenRecord = await RefreshToken.findOne({ where: { token: refreshToken } });

            if (!tokenRecord) {
                return res.status(404).json({ message: "Refresh token not found." });
            }

            await tokenRecord.destroy();

            return res.json({ message: "User logged out successfully." });

        } catch (error) {
            return res.status(500).json({ message: "Error logging out.", error: error.message });
        }
}
}

module.exports = new AuthController();