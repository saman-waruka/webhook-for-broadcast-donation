import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateDonationDto } from 'src/donations/dto/create-donation.dto';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'],
  },
})
export class WebsocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('WebsocketGateway');

  constructor(private configService: ConfigService) {}

  afterInit() {
    this.logger.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    try {
      const authHeader = client.handshake.headers.authorization;
      const authQuery = client.handshake.query.token as string | undefined;

      if (!this.isValidateClient(authHeader, authQuery)) {
        this.logger.warn(`Unauthorized connection attempt from ${client.id}`);
        client.disconnect();
        return;
      }

      this.logger.log(`Client connected: ${client.id}`);
    } catch (error) {
      this.logger.error(`Error during connection: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  broadcastDonation(donation: CreateDonationDto) {
    this.server.emit('donation', donation);
  }

  private isValidateClient(authHeader?: string, authQuery?: string): boolean {
    if (!authHeader && !authQuery) {
      return false;
    }

    const websocketSecret = this.configService.get<string>('WEBSOCKET_SECRET');

    if (authHeader && authHeader !== websocketSecret) {
      return false;
    }

    if (authQuery && authQuery !== websocketSecret) {
      return false;
    }

    return true;
  }
}
