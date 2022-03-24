const bcrypt = require("bcrypt");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//create User model
class User extends Model {
  //set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

//define table columns and config
User.init(
  {
    //define an id column
    id: {
      //use the sequelize datatypes object
      type: DataTypes.INTEGER,
      //equivalent of sql's `NOT NULL`
      allowNull: false,
      //instructs that this is the primary key
      primaryKey: true,
      //turn on auto increment
      autoIncrement: true,
    },
    //define userna column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //define email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //no duplicate email values allowed
      unique: true,
      //if allowNull is set to false, we can run our data through validators before creating table data
      validate: {
        isEmail: true,
      },
    },
    //define password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //pw must at least be 4 chars long
        len: [4],
      },
    },
  },
  {
    hooks: {
      //pass password to bcrypt before creating user
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      //pass password to bcrypt after updating user
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    //TABLE CONFIG OPTIONS
    //pass in direct connection to database
    sequelize,
    //dont automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    //dont pluralize name of database table
    freezeTableName: true,
    //use underscored instead of camel-casing
    underscored: true,
    //make it so our model name stays lowercase in the database
    modelName: "user",
  }
);

module.exports = User;
