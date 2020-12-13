import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

import enableEnvVariables from "@Utils/EnvVariables";

enableEnvVariables();

/**
 *
 * APP CONFIG
 *
 */

export const REGION = "us-east1";

/**
 *
 * INITIALIZE APP
 *
 */

const serviceAccount = JSON.parse(
  process.env.FIREBASE_ACCOUNT as string
) as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

/**
 *
 * APP VARIABLES
 *
 */

const db = admin.firestore();

const time = admin.firestore.Timestamp;

const OnError = functions.https.HttpsError;

const incrementField = admin.firestore.FieldValue.increment;
const addToArray = admin.firestore.FieldValue.arrayUnion;

const CF_URL = `https://${REGION}-url-shortener-e5cde.cloudfunctions.net/`;

const onRequest = functions.region(REGION).https.onRequest;

/**
 *
 * EXPORT
 *
 */

export { db, time, onRequest, OnError, incrementField, addToArray, CF_URL };
