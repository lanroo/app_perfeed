import { reactive } from 'vue';

interface ProfileStore {
  profileImage: string;
  firstName: string;
  lastName: string;
  updateProfileImage: (newImage: string) => void;
}

export const profileStore = reactive<ProfileStore>({
  profileImage: 'https://randomuser.me/api/portraits/lego/6.jpg', 
  firstName: 'Julia',
  lastName: 'Silva',
  updateProfileImage(newImage: string) {
    this.profileImage = newImage;
  }
});
