import DataURIParser from 'datauri/parser.js';
import path, { extname } from 'path'

const getDataUri=(file)=>{
    const parser= new DataURIParser();
    // console.log(file);
    const extName=path.extname(file.originalname).toString();
    // console.log(extName,"hereExt");
    return parser.format(extName,file.buffer);
}

export default getDataUri;
