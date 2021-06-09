import { Component, Vue, Watch } from 'vue-property-decorator';
import { io } from 'socket.io-client';

import AlButton from '@/shared/components/button/button.vue';
import AlInput from '@/shared/components/forms/input/al-input.vue';
import { HomeService } from '@/app/home/home.service';
import { Chatroom, MessageType } from '@/app/home/chatroom';
import { RoomService } from '@/app/rooms/room.service';
import { Room } from '@/app/rooms/room';
import { Pagination } from '@/shared/components/paginate/paginate.type';
import { User } from '@/app/users/user';

const socket = io('http://localhost:3000');

@Component({
  components: {
    AlButton,
    AlInput,
  },
})
export default class HomeController extends Vue {
  private readonly service = new HomeService();
  private readonly roomService = new RoomService();
  private botMessages: Map<string, MessageType[]> = new Map();
  rooms: Room[] = [];
  chatroom = {} as Chatroom;
  selectedRoom: Room = {} as Room;
  currentText = '';
  user!: User;

  async created(): Promise<void> {
    const { data } = await this.roomService.findAll({
      step: Number.MAX_SAFE_INTEGER,
      sort: { roomName: -1 },
      start: 0,
    } as Pagination);

    this.rooms = data;
    this.user = JSON.parse(localStorage.getItem('user') || '{}') as User;

    socket.on('updated chatroom', (chatroom) => {
      if (chatroom.roomId === this.chatroom.roomId) {
        this.chatroom = chatroom;
        this.chatroom.messages.push(
          ...(this.botMessages.get(chatroom.roomId) || ([] as MessageType[]))
        );
        this.chatroom.messages.sort(
          (it1, it2) =>
            new Date(it1.date).getTime() - new Date(it2.date).getTime()
        );
      }
    });

    socket.on('updated chatroom bot', (message) => {
      if (message.roomId === this.chatroom.roomId) {
        this.addBotMessage(message, message.roomId);
        this.chatroom.messages.push(message);
      }
    });

    socket.on('updated messages with error', (message) => {
      if (message.roomId === this.chatroom.roomId) {
        this.addBotMessage(message, message.roomId);
        this.chatroom.messages.push(message);
      }
    });
  }

  @Watch('chatroom', { immediate: true, deep: true })
  private scrollToBottom() {
    setTimeout(() => {
      const container = this.$refs.chatContainer as HTMLElement;

      if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    });
  }

  async selectRoom(room: Room): Promise<void> {
    this.selectedRoom = room;

    this.chatroom = await this.service.find(room._id, this.user._id);
  }

  sendMessage(): void {
    if (this.currentText) {
      socket.emit('chat message', {
        message: this.currentText,
        userId: this.user._id,
        roomId: this.selectedRoom._id,
      });
      this.currentText = '';
    }
  }

  addBotMessage(message: MessageType, roomId: string): void {
    const botMessage = this.botMessages.get(roomId);
    if (botMessage) {
      botMessage.push(message);
      return;
    }
    this.botMessages.set(roomId, [message]);
  }
}
