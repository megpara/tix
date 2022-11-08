import type { NextApiRequest, NextApiResponse } from "next";
import ddb from "../../lib/ddb";
import { fulfillmentWithIntent } from "../../lib/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const { event } = req.query;
  var intentParams = {
    TableName: "volta-intent",
    FilterExpression: "slug = :slug",
    ExpressionAttributeValues: {
      ":slug": event,
    },
  };

  try {
    const intentResults = await ddb.scan(intentParams).promise();
    var fulfillmentParams = {
      TableName: "volta-intent",
      FilterExpression: "slug = :slug",
      ExpressionAttributeValues: {
        ":slug": event,
      },
    };

    const fulfillmentResults = await ddb.scan(fulfillmentParams).promise();

    const combined = fulfillmentWithIntent(fulfillmentResults.Items, intentResults.Items);
    return res.status(200).send(combined.map((c: any) => c.email).join(","));
  } catch (e) {
    console.log(e);
    res.status(404).send("something bad happened");
  }
}
