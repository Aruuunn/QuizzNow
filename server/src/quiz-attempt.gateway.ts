import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Logger, UseGuards } from '@nestjs/common';
 import { Socket, Server } from 'socket.io';
import { WsGuard } from './auth/ws.gaurd';
 
 @WebSocketGateway(undefined,{transports:['websocket', 'polling']})
 export class QuizAttemptGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
 
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
 
  @UseGuards(WsGuard)
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.logger.log('Received a Message from Client');
    this.server.emit('msgToClient', payload);
   
  }
 
  afterInit(server: Server) {
   this.logger.log('Init');
  }
 
  handleDisconnect(client: Socket) {
   this.logger.log(`Client disconnected: ${client.id}`);
  }
 
  handleConnection(client: Socket, ...args: any[]) {
   this.logger.log(`Client connected: ${client.id}`);
  }
 }