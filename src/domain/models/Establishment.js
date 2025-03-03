const {DataTypes} = require("sequelize");
const sequelize = require("../../config/database");


const Establishment = sequelize.define("Establishment", {

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isEmail: true
          }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false

    },
    website: {
        type: DataTypes.STRING,
        allowNull: true

    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true

    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true

    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },

},{
    timestamps: true
});

module.exports = Establishment;
