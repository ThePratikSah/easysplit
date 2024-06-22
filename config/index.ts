const apiKey = process.env.EXPO_PUBLIC_apiKey || "";
const authDomain = process.env.EXPO_PUBLIC_authDomain || "";
const projectId = process.env.EXPO_PUBLIC_projectId || "";
const storageBucket = process.env.EXPO_PUBLIC_storageBucket || "";
const messagingSenderId = process.env.EXPO_PUBLIC_messagingSenderId || "";
const appId = process.env.EXPO_PUBLIC_appId || "";
const env = process.env.ENV || "dev";

export {
  env,
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};
