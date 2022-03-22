import parseJson from 'parse-json';


class DataController {
    dataRepository;
    constructor(repo) {
      this.dataRepository = repo;
    }
    async init() {
      await this.dataRepository.init();
    }
    async readAll(req, res) {
        await this.init();
        const body = req.body;
        if (!body.title) {
            const data = await this.dataRepository.readAll(body);
            if (data == null)
                res.status(500).json("no files found");
            else
                console.log(data);
                res.status(200).json(data);
        }
        else {
            res.status(500).json("no title is needed here")
        }
        
    }
    async read(req, res) {
        await this.init();
        const body = req.body;
        if (!!body.title) {
            const data = await this.dataRepository.read(body);
            if (data != null)
                res.status(200).json(data);
            else
                res.status(500).json("no file found")
        }
        else {
            res.status(500).json("title is null")
        }
    }
    async create(req, res) {
        await this.init();
        const body = req.body;
        if (!!body.title){
            const result = await this.dataRepository.create(body);
            if (result !== null)
                res.status(200).json("successfull creation");
            else
                res.status(500).json("file exists")
        }
        else {
            res.status(500).json("title is null")
        }
    }
    async update(req, res) {
        await this.init();
        const body = req.body;
        if (!!body.title) {
            const result = await this.dataRepository.update(body);
            if (result !== null)
                res.status(200).json("successfull update");
            else
                res.status(500).json("file does not exist")
        }
        else {
            res.status(500).json("title is null")
        }
    }
    async delete(req, res) {
        await this.init();
        const body = req.body;
        if (!!body.title) {
            const result = await this.dataRepository.delete(body);
            if (result !== null)
                res.status(200).json("successfull deletion");
            else
                res.status(500).json("file does not exist")
        }
        else {
            res.status(500).json("title is null")
        }
    }
}

export default DataController;