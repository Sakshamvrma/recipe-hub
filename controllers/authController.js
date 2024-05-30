const express = require("express");
const catchAsync = require("../utils/catchAsync.js");
const appError=require('../utils/appError.js')
const jwt=require('jsonwebtoken');
const User=require('../models/userModel.js')
const { promisify } = require('util');
const signtoken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
}
const createSendToken=(user,statusCode,res)=>{
  const token=signtoken(user._id);
  res.status(statusCode).json({
    status:'success',
    token,
    data:{
      user
    }
  })
}
exports.createSendToken = createSendToken;

exports.signUp=catchAsync(async(req,res,next)=>
    {
  const user=await User.create(req.body);
  createSendToken(user,201,res); 
})

exports.login=catchAsync(async(req,res,next)=>{
  const {email,password}=req.body;
  if(!email||!password){
    return next(new appError('PLease provide email and password',400))
  }
  const user=await User.findOne({email}).select('+password');
  if(!user || !(await user.correctPassword(password,user.password))){
    return next(new appError('Incorrect email or password',401));
  }
  createSendToken(user,200,res);

});


