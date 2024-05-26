const express=require('express');
const catchAsync=require('../utils/catchAsync');
const User=require('../models/userModel');
const AppError=require('../utils/appError');

exports.createUser=catchAsync(async(req,res)=>{
  const user =await User.create(req.body);
  res.status(201).json({
    status:'success',
    data:user
    
  });
});
exports.getAllUsers=catchAsync(async(req,res,next)=>{
  const users=await User.find();
  res.status(200).json({
    status:'success',
    results:users.length,
     data:users
  })
});
exports.getUser=catchAsync(async(req,res,next)=>{
  const user=await User.findById(req.params.id);
  res.status(201).json({
    status:'success',
    data:user,
    
  })
})