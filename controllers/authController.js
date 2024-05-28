const express = require("express");
const catchAsync = require("../utils/catchAsync.js");
const appError=require('../utils/appError.js')
const jwt=require('jsonwebtoken');
const User=require('../models/userModel.js')

exports.signUp=catchAsync(async(req,res,next)=>{
  const user=await User.create(req.body);
  const token=jwt.createToken({id:user._id});
  res.status(201).json({
    status:'success',
    token,
    data:{
      user//console.log(not working)
    }
  })
})

