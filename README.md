# google-cloud-function-bigquery
A cloud function that triggers on GCS events (new files) and runs a query job in BigQuey. To use it, set up two GCS buckets:

* A bucket to host the cloud function and to trigger on (dest bucket)
* A bucket to host a trigger file (src bucket)

Create a GCS transfer from the src bucket to the destination bucket and configure it to run whenever you want.

`gcloud beta functions deploy fakingItWithGCS --stage-bucket faking-it --trigger-bucket faking-it`
