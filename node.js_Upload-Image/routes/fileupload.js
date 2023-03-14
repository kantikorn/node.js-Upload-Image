var express = require('express');
var multer = require('multer');
var router = express.Router();

router.get('/' , function(request , response , next) {
    response.render('Fileupload' , {title:'File Upload in node JS Express using multer' , message : request.flash('success')});
})

router.post('/' , function(request , response , next) {

    var storage = multer.diskStorage({
        destination:function(request , file , callback)
        {
            callback(null, './upload')
        },
        filename : function(request , file , callback)
        {
            var temp_file_arr = file.originalname.split(".");

            var temp_file_name = temp_file_arr[0];

            var temp_file_extension = temp_file_arr[1];

            callback(null , temp_file_name + '-' + Date.now() + '.' +
            temp_file_extension);
        }
    })

    var upload = multer({storage:storage}).single('sample_image');

    upload(request , response , function(error){
        if(error) {
            return response.end('Error Uploadding File !!');
        } 
        else {
           request.flash('success' , request.file.filename);

           response.redirect('/fileupload');
        }
    })
})
module.exports = router