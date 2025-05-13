import { Body, Controller, Post } from '@nestjs/common';
import { Get, Query, Res } from '@nestjs/common';
import axios from 'axios';
import { Response } from 'express';
import { TtsRequestDto } from './dto/tts-request.dto';

@Controller('tts')
export class TtsController {
  @Get()
  async getTTS(@Query('text') text: string, @Res() res: Response) {
    try {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=th&client=tw-ob`;
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      res.setHeader('Content-Type', 'audio/mpeg');
      res.send(response.data);
    } catch (error) {
      res.status(500).send('Error generating TTS');
    }
  }

  // Move DTO to separate file if needed later

  @Post()
  async createTTS(@Body() ttsRequest: TtsRequestDto, @Res() res: Response) {
    try {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(ttsRequest.text)}&tl=th&client=tw-ob`;
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      res.setHeader('Content-Type', 'audio/mpeg');
      res.send(response.data);
    } catch (error) {
      res.status(500).send('Error generating TTS');
    }
  }
}
