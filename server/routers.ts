import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { getAllGames, getGameById, getRtpHistory, getUserAlerts, getUserPreferences } from "./db";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  games: router({
    list: publicProcedure.query(async () => {
      return getAllGames();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getGameById(input.id);
      }),
    getRtpHistory: publicProcedure
      .input(z.object({ gameId: z.number(), limit: z.number().optional() }))
      .query(async ({ input }) => {
        return getRtpHistory(input.gameId, input.limit || 24);
      }),
  }),

  alerts: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserAlerts(ctx.user.id);
    }),
  }),

  preferences: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return getUserPreferences(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
