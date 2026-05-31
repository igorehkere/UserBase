import express from "express";
import cors from "cors";
import { applyTrpcToExpressApp } from "./lib/trpc";
import { trpcRouter } from "./router";
import { type AppContext, createAppContext } from "./lib/ctx";
import { applyPassportToExpressApp } from "./lib/passport";
import { env } from "./lib/env";

void (async () => {
  let ctx: AppContext | null = null;
  const port = env.PORT
  try {
    const expressApp = express();
    ctx = createAppContext();
    expressApp.use(cors());
    expressApp.get("/ping", (req, res) => {
      res.send("pong");
    });
    applyPassportToExpressApp(expressApp, ctx)
    applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

    expressApp.listen(port, () => {
      console.log(`Server listenning: http://localhost:${port}`);
    });
  } catch (e) {
    console.error(e);
    await ctx?.stop();
  }
})();
