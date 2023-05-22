import { MongoClient, Db } from "mongodb"

let cached: Db | null = null;

const connection = "mongodb+srv://admin:admin123456789@cluster0.516vo3v.mongodb.net/?retryWrites=true&w=majority"

export default async function Connect(): Promise<Db> {

//Return connection cache if exist
if (cached) {

    return cached;

}

// Connect to our MongoDB database hosted on MongoDB Atlas
const client = await MongoClient.connect(connection);

// Specify which database we want to use
cached = client.db("cronyism");

//Return cached connection
return cached;
}