const { listingSchema } = require('./listingSchema');
const { reviewSchema } = require('./listingSchema');
const ExpressError = require('./utils/expresserror');

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(', ');
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};


module.exports.validateReview=(req,res,next)=>{
  const{error}= reviewSchema.validate(req.body)
   if (error) {
    const msg = error.details.map(el => el.message).join(', ');
    throw new ExpressError(400, msg);
  } else {
    next();

  }

}