const fileAnalyzerRouter= require("express").Router();
const multer  = require('multer');
var upload = multer({ dest: 'uploads/' })


fileAnalyzerRouter.post('/',upload.single('upfile'),(req,res,next)=>{
	const {originalname,mimetype,size}=req.file;
	req.metadata={name: originalname, type: mimetype, size};
	next();
},(req,res)=>{
	res.json(req.metadata);
});


module.exports= fileAnalyzerRouter;