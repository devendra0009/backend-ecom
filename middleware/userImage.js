import multer from 'multer';

const storage = multer.memoryStorage();
const userImgUpload = multer({ storage }).single('file');
export default userImgUpload;
// const mulitpleUpload = multer({ storage }).array('files',5);
// export default mulitpleUpload;
