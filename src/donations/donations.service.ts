import { Injectable, Logger } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationsService {
  private donations: CreateDonationDto[] = [];

  constructor() {}

  create(createDonationDto: CreateDonationDto) {
    return this.donations.push(createDonationDto);
  }

  findAll() {
    return this.donations;
  }
}
