import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
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

  tours: router({
    list: publicProcedure.query(async () => {
      const { getAllTours } = await import("./db");
      return getAllTours();
    }),
    getById: publicProcedure.input((val) => {
      if (typeof val !== "number") throw new Error("Expected number");
      return val;
    }).query(async ({ input }) => {
      const { getTourById } = await import("./db");
      return getTourById(input);
    }),
  }),

  applications: router({
    submit: publicProcedure
      .input((val) => {
        if (typeof val !== "object" || val === null) throw new Error("Invalid input");
        return val as any;
      })
      .mutation(async ({ input }) => {
        const { createUserApplication, markApplicationAsSent } = await import("./db");
        const { sendToTelegram } = await import("./telegram");

        // Create application in database
        const result = await createUserApplication(input);
        const applicationId = (result as any).insertId;

        // Send to Telegram
        const sent = await sendToTelegram({
          title: "📝 Новая заявка на тур",
          tourName: input.tourName,
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          groupSize: input.groupSize,
          budget: input.budget,
          preferredDates: input.preferredDates,
          preferences: input.preferences ? JSON.parse(input.preferences) : undefined,
          specialRequests: input.specialRequests,
        });

        if (sent) {
          await markApplicationAsSent(applicationId);
        }

        return { success: true, id: applicationId };
      }),
  }),

  feedback: router({
    submit: publicProcedure
      .input((val) => {
        if (typeof val !== "object" || val === null) throw new Error("Invalid input");
        return val as any;
      })
      .mutation(async ({ input }) => {
        const { createFeedback } = await import("./db");
        const { sendToTelegram } = await import("./telegram");

        // Create feedback in database
        await createFeedback(input);

        // Send to Telegram
        await sendToTelegram({
          title: "💬 Новое сообщение обратной связи",
          firstName: input.name.split(" ")[0] || input.name,
          lastName: input.name.split(" ")[1] || "",
          email: input.email,
          phone: input.phone || "Не указан",
          groupSize: 1,
          specialRequests: `Тема: ${input.subject}\n\nСообщение: ${input.message}`,
        });

        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
