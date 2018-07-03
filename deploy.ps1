#aws s3 sync . s3://fplmatchtrackerweb  --exclude * --include index.html --acl public-read
#aws s3 sync dist s3://fplmatchtrackerweb/dist --acl public-read
#aws s3 sync . s3://fplmatchtrackerweb --acl public-read
aws s3 sync . s3://fplmatchtrackerweb --acl public-read
