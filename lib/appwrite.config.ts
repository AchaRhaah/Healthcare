import * as sdk from "node-appwrite";

export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("675f69fb001c48d91f81")
  .setKey(
    "standard_e1245f2eec5c10e3d887234e9ae1e5c6984c41bc2759faac45d655bd78bb4110eb3e856a9337310c8b2601ea10af90d3448d12d53edbaea96d49b665c6d2a96ece25ea95a65456ce870813c464fa4f886bbb34fd35e203fee1320cc9368dd44d0adab5c12261866aadec4303f8af7c0a00faaedc4fa07ccdbccb8db4bac1937f"
  );

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
