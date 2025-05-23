import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';

@Module({
  imports: [HttpModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
