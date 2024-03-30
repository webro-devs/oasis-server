import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  SubscribeMessage,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class MYTGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('WebSocket server initialized!');
  }

  async handleConnection(@ConnectedSocket() client: Socket) {    
    console.log(client.id);
    
    this.server.to(client.id).emit('message', 'you connected successfully');
  }

  handleDisconnect(client: any) {
    this.server.to(client.id).emit('message', 'you disconnected successfully');
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
  }

  @SubscribeMessage('room-message')
  sendMessageToRoom(client: Socket, data: { room: string; message: any }) {
    this.server.to(data.room).emit('receive-room', data.message);
  }
}
