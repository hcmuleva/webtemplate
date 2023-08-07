import { Ably } from "@refinedev/ably";
const ABLY_API_KEY = process.env.REACT_APP_ABLY_API_KEY;

export const ablyClient = new Ably.Realtime(ABLY_API_KEY);