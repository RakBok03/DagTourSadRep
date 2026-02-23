/**
 * Telegram Bot integration for sending notifications
 */

import axios from "axios";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

export interface TelegramMessage {
  title: string;
  tourName?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  groupSize: number;
  budget?: string;
  preferredDates?: string;
  preferences?: Record<string, any>;
  specialRequests?: string;
}

/**
 * Format application data into a readable Telegram message
 */
function formatApplicationMessage(data: TelegramMessage): string {
  const lines = [
    `<b>${data.title}</b>`,
    "",
    `<b>Тур:</b> ${data.tourName || "Не указан"}`,
    `<b>Имя:</b> ${data.firstName} ${data.lastName}`,
    `<b>Email:</b> ${data.email}`,
    `<b>Телефон:</b> ${data.phone}`,
    `<b>Количество человек:</b> ${data.groupSize}`,
  ];

  if (data.budget) {
    lines.push(`<b>Бюджет:</b> ${data.budget}`);
  }

  if (data.preferredDates) {
    lines.push(`<b>Предпочитаемые даты:</b> ${data.preferredDates}`);
  }

  if (data.preferences && Object.keys(data.preferences).length > 0) {
    lines.push(`<b>Предпочтения:</b>`);
    Object.entries(data.preferences).forEach(([key, value]) => {
      lines.push(`  • ${key}: ${value}`);
    });
  }

  if (data.specialRequests) {
    lines.push(`<b>Особые пожелания:</b> ${data.specialRequests}`);
  }

  return lines.join("\n");
}

/**
 * Send application data to Telegram group
 */
export async function sendToTelegram(data: TelegramMessage): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn(
      "[Telegram] Bot token or chat ID not configured. Skipping notification."
    );
    return false;
  }

  try {
    const message = formatApplicationMessage(data);

    const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "HTML",
    });

    if (response.data.ok) {
      console.log("[Telegram] Message sent successfully");
      return true;
    } else {
      console.error("[Telegram] API returned error:", response.data);
      return false;
    }
  } catch (error) {
    console.error("[Telegram] Failed to send message:", error);
    return false;
  }
}
