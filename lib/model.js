var imageStore = new FS.Store.GridFS("files", {
  mongoUrl: 'mongodb://localhost:3001/test/', // optional, defaults to Meteor's local MongoDB
  maxTries: 1, // optional, default 5
  chunkSize: 1024*1024  // optional, default GridFS chunk size in bytes (can be overridden per file).
                        // Default: 2MB. Reasonable range: 512KB - 4MB
});

patientFiles = new FS.Collection("files", {
  stores: [imageStore]
});