import getDB from './db';


class DataRepository {
    db;
    coll;
    async init() {
        this.db = await getDB();
    }
    async readAll() // TODO eliminate _id from query result
    {
        const query = { 
            title: { 
                $exists: true 
            } 
        };
        const data = await this.db?.collection("openapi").find(query).toArray();
        return data;
    }
    async read(body) {
        const title = {
            title: body.title
        };
        const data = await this.db?.collection("openapi").findOne(title);
        if (data == null)
        {
            return null;
        }
        const returnedData = {
            title: data.title,
            description: data.description
        }
        return returnedData;
    }
    async create(body) {
        const title = {
            title: body.title
        }
        const data = await this.read(title);
        if (!data) {
            const newData = {
                title: body.title,
                description: body.description
            }
            return await this.db?.collection("openapi").insertOne(newData);
        }
        else {
            return null;
        }
    }
    async update(body) {
        const title = {
            title: body.title
        }
        const data = await this.read(title);
        if (data != null)
        {
            const updatedData = {
                description: body.description
            }
            const selector = {
                title: data.title,
            }
            return await this.db?.collection("openapi").updateOne(selector , { $set: updatedData }, { upsert: true });
        }
        else {
            return null;
        }
    }
    async delete(body) {
        const title = {
            title: body.title
        }
        const data = await this.read(title);
        if (data != null)
        {
            return await this.db?.collection("openapi").deleteOne(title);
        }
        else {
            return null;
        }
    }
 
  }

  export default DataRepository;

  //id (hidden mongo stuff)
  //title (key)
  //description