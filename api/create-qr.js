import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.QR_TABLE_NAME,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'qrId': a unique uuid
    // - 'content': parsed from request body
    // - 'lat': parsed from request body
    // - 'lng': current Unix timestamp
    Item: {
      // userId: event.requestContext.identity.cognitoIdentityId,
      qrId: uuid.v1(),
      qrName: data.qrName,
      lat: data.lat,
      lng: data.lng,
      // attachment: data.attachment,
      createdAt: Date.now()
    }
  };
  await dynamoDb.put(params);

  return params.Item;
});