import { ApiHandler } from "sst/node/api";
import { useSession } from "sst/node/auth";
import Connect from "../../../shared/database/connect/connect";
import { ObjectId } from "mongodb";

export const handler = ApiHandler(async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const session = useSession();
    const client = await Connect()
    const database = client.collection("Users")

    // Check user is authenticated
    if (session.type !== "user") {

        throw new Error("Not authenticated");

    }

    const user_id =  new ObjectId(session.properties.user_id)   

    const response = await database.findOne({ _id : user_id });

    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };

});