import { defineConfig } from "orval";

export default defineConfig({
  innerspaceApi: {
    input: {
      target: "./openapi.yaml",
    },
    output: {
      mode: "single",
      target: "./src/gen/output.ts",
      client: "react-query",
      httpClient: "fetch",
      override: {
        query: {
          useQuery: true,
          signal: true,
        },
        mutator: {
          path: "./src/gen/mutator.ts",
          name: "customInstance",
        },
      },
    },
  },
});
