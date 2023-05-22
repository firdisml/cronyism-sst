import { Session, AuthHandler, GoogleAdapter,  } from "sst/node/auth";
import Connect from "../../../shared/database/connect/connect"
import Users from "../../../shared/database/model/users"
import { ObjectId } from "mongodb";
declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      user_id: string,
    };
  }
}

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID: "85203977808-e3k1hb0dv8pf2e7pighn59li87atqus1.apps.googleusercontent.com",
      onSuccess: async (tokenset) => {
        const claims = tokenset.claims();
        const client = await Connect()
        const database = client.collection("Users")

        const User: Users= {
          sub: claims.sub,
          email: claims.email,
          picture: claims.picture,
          name: claims.given_name,
          description : "Default"
        };

        const response = await database.insertOne(User)



        return Session.parameter({
          redirect: "http://localhost:3000/",
          type: "user",
          properties: {
            user_id: response.insertedId.toString(),
          },
        });
      },
    }),
  },
});