import AWS from 'aws-sdk';

const s3 = new AWS.S3({ params: { Bucket: "website-source-test" } });

// get example
export function get(params) {
    return s3.getObject(params).promise();
}

export function putAndUpdate(params) {
    return s3.putObject(params).promise()
        .then(function(data) {
            console.log(data);
            return data;
        })
        .catch(function (err) {
            console.log(err, err.stack);
        })
}

export function deleteObject(params) {
    return s3.deleteObject(params).promise()
        .then(function(data) {
            console.log(data);
            return data;
        })
        .catch(function (err) {
            console.log(err, err.stack);
        })
}