import multer from 'multer';
import util from 'util';
import GridFsStorage from "multer-gridfs-storage";

// var uploadFiles = multer({ storage: storage }).single("file");
const uploadFilesMiddleware = util.promisify(multer({
    storage: new GridFsStorage({
        url: "mongodb://developer:des+2016@mongodb:27017/senacyt_files",
        options: { useNewUrlParser: true, useUnifiedTopology: true },
        file: (req: any, file: any) => {
            const filename = `doc${GetFecha()}${file.originalname}`;
            const fileInfo = {
                filename,
                metadata: {
                    usuario: Number(req.params.id_usuario),
                    nombre_documento_original: file.originalname,
                    modulo: "CD"
                }

            }
            return fileInfo;
        }
    })
}).single("file"));

function GetFecha() {
    const date_ob = new Date();

    // current date
    const date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    const year = date_ob.getFullYear();

    // current hours
    const hours = date_ob.getHours();

    // current minutes
    const minutes = date_ob.getMinutes();

    // current seconds
    const seconds = date_ob.getSeconds();

    // YYYY-MM-DD HH-MM-SS format
    return year + "-" + month + "-" + date + " " + hours + "-" + minutes + "-" + seconds;
}
export default uploadFilesMiddleware;