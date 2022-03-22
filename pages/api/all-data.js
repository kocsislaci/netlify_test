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
            return controller.readAll(req, res).catch((e) => {
                console.log(e);
                return res.status(500).json("INTERNAL_SERVER_ERROR")
        })
            break;
        case "CREATE":
            return res.status(500).json("no such feature")
            break;
        case "UPDATE":
            return res.status(500).json("no such feature")
            break;
        case "DELETE":
            return res.status(500).json("no such feature")
            break;
        default:
            return res.status(404).json("Wrong type of request")
            break;
    }
}