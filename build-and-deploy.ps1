npm run build
aws s3 sync ./build s3://fplmatchtrackerweb3 --acl public-read
aws s3 sync ./build s3://fplmatchtrackerweb --acl public-read