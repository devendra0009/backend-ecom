import multer from 'multer';

const storage = multer.memoryStorage();
// const singleUpload = multer({ storage }).single(file);
// export default singleUpload;
const mulitpleUpload = multer({ storage }).array('files',5);
export default mulitpleUpload;
