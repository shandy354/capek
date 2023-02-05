
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || 
    file.mimetype === 'image/jpeg' || 
    file.mimetype === 'image/jpg'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}
module.exports={
    upload : multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 7
        },
        fileFilter:fileFilter
    })
}
//  const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter:fileFilter
// })

/////////



// module.exports = upload;