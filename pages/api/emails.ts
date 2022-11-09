import type { NextApiRequest, NextApiResponse } from "next";
import { FulfillmentData, IntentData } from "../../hooks/types";
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

  var fulfillmentParams = {
    TableName: "volta-fulfillment",
    FilterExpression: "slug = :slug",
    ExpressionAttributeValues: {
      ":slug": event,
    },
  };

  try {
    const intentResults = await ddb.scan(intentParams).promise();
    const fulfillmentResults = await ddb.scan(fulfillmentParams).promise();

    const combined = fulfillmentWithIntent(fulfillmentResults.Items as FulfillmentData[], intentResults.Items as IntentData[]);
    return res.status(200).send(combined.map((c: any) => c.email).join(","));
  } catch (e) {
    // console.log(e);
    res.status(404).send("something bad happened");
  }
}
