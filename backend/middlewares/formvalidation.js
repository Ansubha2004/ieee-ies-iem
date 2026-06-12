import joi from "joi";

export const FormValidation=(req,res,next)=>{
    const schema=joi.object({
        name:joi.string().min(2).max(100).required(),
        email:joi.string().email().required(),
        subject:joi.string().min(3).max(60).required(),
        message:joi.string().min(3).max(500).required()
    })

    const {error}=schema.validate(req.body);
    if(error)
    {
        return res.status(400).json({success:false,message:error.details[0].message});
    }
    next();
}

export const updatecontactformValidation=(req,res,next)=>{
    const schema=joi.object({
        email:joi.string().email().required(),
        institute:joi.string().min(2).max(100).required(),
        address:joi.string().min(3).max(500).required(),
        mapurl:joi.string().uri().required()
    })

    const {error}=schema.validate(req.body);
    if(error)
    {
        return res.status(400).json({success:false,message:error.details[0].message});
    }
    next();
}