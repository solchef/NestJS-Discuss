import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private bot: TelegramBot;

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new TelegramBot(token, { polling: true });
  }

  onModuleInit() {
    this.bot.onText(/\/start/, (msg, match) => {
      const chatId = msg.chat.id;
      const [command, parameter] = match.input.split(' ');

      if (parameter === 'launch_web_app') {
        this.bot.sendMessage(chatId, 'Click the button below to open the Forum:', {
          reply_markup: {
            inline_keyboard: [
              [{
                text: "Open Web App",
                web_app: { url: this.configService.get<string>('TELEGRAM_MINI_APP_URL') } 
              }],
            ],
          },
        });
      } else {
        const keyboard = {
          reply_markup: {
            keyboard: [
              [{ text: 'Forum' }, { text: 'Buy $Bros' }, { text: 'Account' }],
            ],
            resize_keyboard: true,
            one_time_keyboard: false,
          },
        };
        this.bot.sendMessage(chatId, 'Select an option:', keyboard);
      }
    });

    this.bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      const text = msg.text;

      if (text === 'Forum') {
        // Send an inline button with a link to the private chat with the bot
        this.bot.sendMessage(chatId, 'Click the button below to open the Forum in a private chat:', {
          reply_markup: {
            inline_keyboard: [
              [{
                text: "Open Forum in Private Chat",
                url: `https://t.me/broscams_bot?start=launch_web_app`
              }],
            ],
          },
        });
      } else {
        // Handle other messages or commands
      }
    });
  }
}
