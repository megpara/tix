import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import ddb from "../../lib/ddb";
import { event } from "../config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method !== "POST") {
    res.status(200).send("hm");
  }

  const { create_time, update_time, id, firstName, lastName, payer_id, uuid } =
    req.body;
  const { slug } = event;
  var params = {
    TableName: "volta-fulfillment",
    Item: {
      uuid,
      create_time,
      update_time,
      id,
      firstName,
      lastName,
      payer_id,
      slug,
      timestamp: new Date().toISOString(),
    },
  };
  try {
    await ddb.put(params).promise();
    res.status(200).send("yay");
  } catch (e) {
    console.log(e);
    res.status(404).end();
  }
}
