import { Controller, Post, Body, Get, Logger } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Controller('donations')
export class DonationsController {
  private readonly logger = new Logger(DonationsController.name);

  constructor(
    private readonly donationsService: DonationsService,
    private readonly websocketGateway: WebsocketGateway,
  ) {}

  @Post()
  async create(@Body() createDonationDto: CreateDonationDto) {
    await this.donationsService.create(createDonationDto);

    try {
      this.websocketGateway.broadcastDonation(createDonationDto);
      // TODO: remove this log I just add log for demonstrate
      this.logger.log('BroadCast Success', createDonationDto);
    } catch (error) {
      this.logger.error('Error broadcasting donation:', error);
    }
    return { status: 'ok' };
  }

  @Get()
  findAll() {
    const donations = this.donationsService.findAll();
    return { data: { donations } };
  }
}
