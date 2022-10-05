const S3_REGEX = /^s3:\/\/com.guild.us-west-2.public-data\/project-data\/.*.zip$/i;

const isS3Bucket = (url) => {
  return S3_REGEX.test(url);
}

module.exports.isS3Bucket = isS3Bucket;