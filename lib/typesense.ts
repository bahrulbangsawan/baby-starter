import Typesense from "typesense";

const adminClient = new Typesense.Client({
  nodes: [{ host: process.env.TYPESENSE_HOST!, port: Number(process.env.TYPESENSE_PORT!), protocol: process.env.TYPESENSE_PROTOCOL! }],
  apiKey: process.env.TYPESENSE_ADMIN_API_KEY!,
  connectionTimeoutSeconds: 2,
});

const searchClient = new Typesense.Client({
  nodes: [{ host: process.env.TYPESENSE_HOST!, port: Number(process.env.TYPESENSE_PORT!), protocol: process.env.TYPESENSE_PROTOCOL! }],
  apiKey: process.env.TYPESENSE_SEARCH_ONLY_API_KEY!,
  connectionTimeoutSeconds: 2,
});

export { adminClient, searchClient };