const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "no blogs found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All blogs lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).send({
      success: false,
      message: "error while getting blogs",
      error,
    });
  }
};

exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "blog not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetched blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while getting single blog",
    });
  }
};

exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "provide all fields",
      });
    }
    //check if you find user
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user ",
      });
    }
    // by using array psuh method by creating a session

    const newBlog = new blogModel({ title, description, image });
    const session = await mongoose.startSession();
    //perform transaction and update event
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while creating blog",
      error,
    });
  }
};

exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.body;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "blog updated",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while updating blog",
      error,
    });
  }
};

exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "blog deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while deleting blog",
      error,
    });
  }
};

exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blog not found w this id",
      });
    }
    return res.status(200).send({
      success: false,
      message: "user blog",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      error,
    });
  }
};
