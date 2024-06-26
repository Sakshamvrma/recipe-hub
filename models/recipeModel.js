const mongoose=require('mongoose');
const slugify=require('slugify');
const recipeSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Please provide the name of the recipe'],
  },
  slug:String,
  ingredients:{
    type:String,
    required:[true,'Please provide the ingredients']
  },
  difficulty: {
    type: String,
    required: [true, 'A Recipe must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty is either: easy, medium, difficult'
    }
  },
  Chef: [
    {
      type: mongoose.Schema.ObjectId,

      ref: 'User'
    }
  ],
  instructions:{
    type:String,
    required:[true,'Please provide the instructions']
  },
  image:{
    type:String
  },
  category:{
    type:String,
    enum:['breakfast','lunch','dinner','snack','dessert'],
    required:true
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  cookingTime: {
    type: Number
   // required: [true, 'Plesae provide the cooking time']
  },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });
  // Virtual populate
recipeSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'recipe',
  localField: '_id'
});

  module.exports=mongoose.model('Recipe',recipeSchema);



