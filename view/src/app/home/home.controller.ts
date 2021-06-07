import { Component, Vue } from 'vue-property-decorator';
import { io } from 'socket.io-client';

import AlButton from '@/shared/components/button/button.vue';
import AlInput from '@/shared/components/forms/input/al-input.vue';
import { HomeService } from '@/app/home/home.service';
import { Chatroom } from '@/app/home/chatroom';
import { RoomService } from '@/app/rooms/room.service';
import { Room } from '@/app/rooms/room';
import { Pagination } from '@/shared/components/paginate/paginate.type';

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
  rooms: Room[] = [];
  chatroom = {} as Chatroom;
  selectedRoom: Room = {} as Room;
  currentText = '';

  async created(): Promise<void> {
    const { data } = await this.roomService.findAll({
      step: Number.MAX_SAFE_INTEGER,
      sort: { roomName: -1 },
      start: 0,
    } as Pagination);

    this.rooms = data;

    socket.on('updated chatroom', (chatroom) => {
      console.log(chatroom);
      this.chatroom = chatroom;
    });
  }

  async selectRoom(room: Room): Promise<void> {
    this.selectedRoom = room;

    this.chatroom = await this.service.find(
      room._id,
      '60bd1273a48309910aaf28a9'
    );
  }

  sendMessage(): void {
    socket.emit('chat message', {
      message: this.currentText,
      userId: '60bd1273a48309910aaf28a9',
      roomId: this.selectedRoom._id,
    });
  }
}
