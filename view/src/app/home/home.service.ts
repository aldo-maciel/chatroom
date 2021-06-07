import { ServiceFacade } from '@/shared/service/facade.service';
import { Chatroom } from '@/app/home/chatroom';

export class HomeService extends ServiceFacade {
  private static get URL(): string {
    return 'chatroom';
  }

  create(originalUrl: string): Promise<Chatroom> {
    return this.doPost<Chatroom>(HomeService.URL, { originalUrl });
  }

  find(roomId: string, userId: string): Promise<Chatroom> {
    return this.doPatch<Chatroom>(`${HomeService.URL}/${roomId}/${userId}`);
  }
}
