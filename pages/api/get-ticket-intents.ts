import type { NextApiRequest, NextApiResponse } from "next";
import ddb from "../../lib/ddb";

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  const { event } = req.query;
  var params = {
    TableName: "volta-intent",
    FilterExpression: "slug = :slug",
    ExpressionAttributeValues: {
      ":slug": event,
    },
  };

  try {
    const results = await ddb.scan(params).promise();
    res.status(200).send(JSON.stringify(results.Items));
  } catch (e) {
    console.log(e);
    res.status(404).end();
  }
}
