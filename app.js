const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  ScanCommand,
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async () => {
  try {
    const command = new ScanCommand({
      TableName: "demoStoreS3ImageMetaDataTable",
    });
    const { Items } = await docClient.send(command);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      // No JSON.stringify - return object directly if working with API Gateway
      body: {
        message: "All records fetched successfully",
        data: Items,
      },
    };
  } catch (error) {
    console.error("Error fetching records: ", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        message: "Error fetching records",
        error: error.message,
      },
    };
  }
};