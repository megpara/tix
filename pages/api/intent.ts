import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import ddb from "../../lib/ddb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method !== "POST") {
    res.status(200).send("hm");
  }

  const { firstName, lastName, email, numTickets } = req.body;
  const uuid = uuidv4();
  var params = {
    TableName: "volta-intent",
    Item: {
      uuid,
      firstName,
      lastName,
      email,
      numTickets,
      timestamp: new Date().toISOString(),
    },
  };
  try {
    await ddb.put(params).promise();
    res.status(200).send(uuid);
  } catch (e) {
    console.log(e);
    res.status(404).end();
  }
}
