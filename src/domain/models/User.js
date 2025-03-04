const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../../config/database");


const User = sequelize.define("User", {

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
          }
    },
    role: {
        type: DataTypes.ENUM("owner", "admin", "domiciliary", "customer"),
        allowNull: false,
        defaultValue: "owner"
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },  
}, {
    timestamps: true,
    hooks: {
        async beforeCreate(user){
            if (user.changed("password")){
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        async beforeUpdate(user) {
            if (user.changed("password")) {
              const salt = await bcrypt.genSalt(10);
              user.password = await bcrypt.hash(user.password, salt);
            }
          }  
    },
});

module.exports = User;