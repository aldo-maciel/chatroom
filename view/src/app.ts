import { Component, Vue } from 'vue-property-decorator';

import AlInput from '@/shared/components/forms/input/al-input.vue';
import AlButton from '@/shared/components/button/button.vue';
import navbar from '@/shared/components/navbar/navbar.vue';
import { UserService } from '@/app/users/user.service';
import { User } from '@/app/users/user';
import { onError } from '@/shared/utils/error';

@Component({
  components: {
    navbar,
    AlInput,
    AlButton,
  },
})
export default class App extends Vue {
  transitionName = 'slide-left';
  private userService = new UserService();
  currentUser: User = {} as User;

  mounted(): void {
    const user = localStorage.getItem('user');
    console.log(user);
    if (user === 'null' || !user) {
      this.$modal.show('loginModal');
    }
  }

  login(): void {
    const { username, password } = this.currentUser;
    this.userService
      .login(username, password)
      .then((user) => {
        if (!user) {
          return onError('User not found!');
        }
        localStorage.setItem('user', JSON.stringify(user));
        this.onCloseModal();
      })
      .catch(onError);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.mounted();
  }

  onCloseModal(): void {
    this.$modal.hide('loginModal');
  }

  created(): void {
    this.$router.beforeEach((to, from, next) => {
      this.transitionName = to.name === 'Home' ? 'drain' : 'slither';

      next();
    });
  }
}
