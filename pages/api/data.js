import DataRepository from "../../server/repository/data.repository";
import DataController from "../../server/controller/data.controller";


export default function handler(
    req,
    res,
) {
    const controller = new DataController(
        new DataRepository()
    );
    const body = req.body;
    switch (body.method)
    {
        case "READ":
            return controller.read(req, res).catch((e) => {
                console.log(e);
                return res.status(500).json("INTERNAL_SERVER_ERROR")
        })
            break;
        case "CREATE":
            return controller.create(req, res).catch((e) => {
                console.log(e);
                return res.status(500).json("INTERNAL_SERVER_ERROR")
            })
            break;
        case "UPDATE":
            return controller.update(req, res).catch((e) => {
                console.log(e);
                return res.status(500).json("INTERNAL_SERVER_ERROR")
            })
            break;
        case "DELETE":
            return controller.delete(req, res).catch((e) => {
                console.log(e);
                return res.status(500).json("INTERNAL_SERVER_ERROR")
            })
            break;
        default:
            return res.status(404).json("Wrong type of request")
            break;
    }
}