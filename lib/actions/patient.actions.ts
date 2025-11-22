"use server";
import { users, databases, storage } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create

    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newuser);
  } catch (error: unknown) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return user;
  } catch (error: unknown) {
    if (error.code === 404) {
      console.error(`User not found: ${userId}`);
      return null; // Return null for not-found cases
    }
    throw error; // Re-throw other errors
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // Upload file
    let file;
    if (identificationDocument) {
      const blobFile = identificationDocument?.get("blobFile") as Blob;
      const fileName = identificationDocument?.get("fileName") as string;

      // Convert Blob to File
      const fileObject = new File([blobFile], fileName, {
        type: blobFile.type,
      });

      file = await storage.createFile(
        "675f6c8f003b515549cb", // Bucket ID
        ID.unique(),
        fileObject
      );
    }

    // Create new patient document
    const newPatient = await databases.createDocument(
      "675f6b2c00001814449e", // Database ID
      "675f6be00016b6bd1919", // Collection ID
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `https://cloud.appwrite.io/v1/storage/buckets/675f6c8f003b515549cb/files/${file.$id}/view?project=675f69fb001c48d91f81`
          : null,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patient = await databases.listDocuments(
      "675f6b2c00001814449e",
      "675f6be00016b6bd1919",
      [Query.equal("userId", userId)]
    );
    return parseStringify(patient.documents[0]);
  } catch (error: unknown) {
    console.log(error);
  }
}; 
