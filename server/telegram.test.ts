import { describe, it, expect, beforeAll } from "vitest";
import axios from "axios";

describe("Telegram Bot Integration", () => {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  it("should have Telegram credentials configured", () => {
    expect(TELEGRAM_BOT_TOKEN).toBeDefined();
    expect(TELEGRAM_CHAT_ID).toBeDefined();
    expect(TELEGRAM_BOT_TOKEN).not.toBe("");
    expect(TELEGRAM_CHAT_ID).not.toBe("");
  });

  it("should validate Telegram bot token format", () => {
    // Token format: {bot_id}:{token}
    const tokenRegex = /^\d+:[A-Za-z0-9_-]+$/;
    expect(TELEGRAM_BOT_TOKEN).toMatch(tokenRegex);
  });

  it("should validate Telegram chat ID format", () => {
    // Chat ID is typically a negative number for groups
    const chatId = parseInt(TELEGRAM_CHAT_ID || "0", 10);
    expect(chatId).not.toEqual(0);
  });

  it("should be able to call Telegram API getMe endpoint", async () => {
    if (!TELEGRAM_BOT_TOKEN) {
      console.warn("Skipping API test: TELEGRAM_BOT_TOKEN not set");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`,
        { timeout: 5000 }
      );

      expect(response.status).toBe(200);
      expect(response.data.ok).toBe(true);
      expect(response.data.result).toBeDefined();
      expect(response.data.result.is_bot).toBe(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Telegram API error: ${error.response?.status} - ${error.response?.data?.description || error.message}`
        );
      }
      throw error;
    }
  });
});
