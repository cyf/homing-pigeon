import OSS from "ali-oss";

declare global {
  var client: OSS | undefined;
}

const client =
  global.client ||
  new OSS({
    region: process.env.ALIYUN_OSS_REGION, // 示例：'oss-cn-hangzhou'，填写Bucket所在地域。
    accessKeyId: process.env.ALIYUN_OSS_ACCESS_KEY_ID, // 确保已设置环境变量OSS_ACCESS_KEY_ID。
    accessKeySecret: process.env.ALIYUN_OSS_ACCESS_KEY_SECRET, // 确保已设置环境变量OSS_ACCESS_KEY_SECRET。
    bucket: process.env.ALIYUN_OSS_BUCKET, // 示例：'my-bucket-name'，填写存储空间名称。
    cname: true,
    secure: false,
    endpoint: process.env.ALIYUN_OSS_ENDPOINT,
  });

if (process.env.NODE_ENV === "development") global.client = client;

export default client;
