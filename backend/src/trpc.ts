import { initTRPC } from "@trpc/server";

const users = [
  { id: 1, nick: "user1", name: "Igor 1" },
  { id: 2, nick: "user2", name: "Igor 2" },
  { id: 3, nick: "user3", name: "Igor 3" },
  { id: 4, nick: "user4", name: "Igor 4" },
  { id: 5, nick: "user5", name: "Igor 5" },
];
const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
  getUsers: trpc.procedure.query(() => {
    return { users };
  }),
});

export type TrpcRouter = typeof trpcRouter;
