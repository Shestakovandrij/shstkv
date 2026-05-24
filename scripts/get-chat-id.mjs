#!/usr/bin/env node
// Helper: prints all chat_id-s the bot has received messages from.
// Usage:
//   1) Open Telegram, write any message to your bot.
//   2) Set TELEGRAM_BOT_TOKEN env var (or put it in .env.local).
//   3) Run: npm run telegram:chatid

import fs from 'node:fs';
import path from 'node:path';

function loadEnvFile() {
  const file = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(file)) return;
  const text = fs.readFileSync(file, 'utf8');
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    if (process.env[m[1]] === undefined) process.env[m[1]] = m[2];
  }
}

loadEnvFile();

const token = process.env.TELEGRAM_BOT_TOKEN;
if (!token) {
  console.error('TELEGRAM_BOT_TOKEN is missing. Set it in .env.local');
  process.exit(1);
}

const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
const json = await res.json();
if (!json.ok) {
  console.error('Telegram API error:', json);
  process.exit(1);
}
if (!json.result?.length) {
  console.log('No updates yet. Send a message to your bot first, then re-run this script.');
  process.exit(0);
}

const chats = new Map();
for (const upd of json.result) {
  const msg = upd.message ?? upd.edited_message ?? upd.channel_post;
  if (!msg?.chat) continue;
  chats.set(msg.chat.id, msg.chat);
}

console.log('Chat IDs the bot has seen:');
for (const chat of chats.values()) {
  const name = chat.title ?? `${chat.first_name ?? ''} ${chat.last_name ?? ''}`.trim() ?? chat.username;
  console.log(`  ${chat.id}  —  ${chat.type}  —  ${name}`);
}
console.log('\nAdd the desired id to .env.local as TELEGRAM_CHAT_ID');
