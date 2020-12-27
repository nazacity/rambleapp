import AWS from 'aws-sdk';

const S3 = new AWS.S3({
  accessKeyId: 'PU4JXRL3KG6ABV3CHQNS',
  secretAccessKey: 'x6oK8C50E97X5BImp5KkHzww/c9f8xFE+1jQr4r6NS4',
  region: 'nyc3',
  endpoint: `nyc3.digitaloceanspaces.com`,
  signatureVersion: 'v4',
});

export default S3;
