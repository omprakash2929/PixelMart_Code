import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    //* Validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "answer is Required" });
    }
    //*Check User
    const exsitingUser = await userModel.findOne({ email });

    //* Exisiting User
    if (exsitingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please Login",
      });
    }

    //! Register User
    const hashedPassword = await hashPassword(password);

    //!Save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(200).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

//! post Login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //! Validation

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invlid Email or Password",
      });
    }

    //* Check User

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: true,
        message: "Email in not found!!",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invaild Password",
      });
    }

    //! Create Token
    // ,{
    //     expiresIn:'30d',
    // }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//*forgotpasswordController
export const forgotpasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({
        message: "Email is require",
      });
    }
    if (!answer) {
      res.status(400).send({
        message: "answer is require",
      });
    }
    if (!newPassword) {
      res.status(400).send({
        message: "New Password is require",
      });
    }

    //? Check
    const user = await userModel.findOne({ email, answer });
    //! vaildation

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrong Email or Answer",
      });
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset is successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something is wrong",
      error,
    });
  }
};

//! Profile  Update Controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //* password
    if (password && password.length < 6) {
      return res.json({ error: "please is require and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    //* Update
    const updateUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile is Update",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "The error is UpdateProfile API",
      error,
    });
  }
};

//? Order Controller

export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error in Order Api",
      error,
    });
  }
};

export const allUserConteroller = async(req, res) => {
  try {
    const result = await userModel.find({});
    res.json(result);
    
  } catch (error) {
    console.log(error)
    res.status(404).send({
      success:false,
      message:"error is Testconteroller api",
      error
    })
    
  }
};

//! Admin All Orders

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "all admin orders Error API",
    });
  }
};

//! Status Order Upadet controller

export const OrdersStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Api Error in OrdersStatus",
      error,
    });
  }
};
