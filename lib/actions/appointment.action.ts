"use server";

import { databases } from "../appwrite.config";
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      "675f6b2c00001814449e", // Database ID
      "675f6c50000ee650c9a2", // Collection ID
      ID.unique(),
      appointment
    );
    return parseStringify(newAppointment);
  } catch (error: unknown) {
    // Check existing user

    console.error("An error occurred while creating a new appointment:", error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      "675f6b2c00001814449e", // Database ID
      "675f6c50000ee650c9a2", // Collection ID
      appointmentId
    );
    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};
