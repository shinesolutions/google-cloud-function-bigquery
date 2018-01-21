exports.fakingItWithGCS = function(event, callback) {
  const file = event.data;
  if (
    file.resourceState === "exists" &&
    file.name &&
    file.name.indexOf("trigger/") !== -1
  ) {

    const bigquery = require('@google-cloud/bigquery')();
    const query =
      "SELECT url FROM `publicdata.samples.github_nested` LIMIT 100";

    bigquery.createQueryJob(
      {
        destination: bigquery.dataset("faking_it").table("my_table_created_from_a_cloud_function"),
        query: query,
        useLegacySql: false,
        allowLargeResults: true,
        writeDisposition: "WRITE_TRUNCATE",
        createDisposition: "CREATE_IF_NEEDED"
      },
      function(err, job) {
        if (err) {
          console.error("Something went wrong with submitting the BigQuery job. Error: ", err);
        }
        console.log("BigQuery job successfully submitted");
        callback();
      }
    );
  } else {
    console.log("Nothing to do here, ignoring.");
    callback();
  }
};
