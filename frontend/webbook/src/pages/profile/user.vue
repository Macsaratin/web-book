<template>

  <div class="min-h-screen bg-gray-100">
    <nav class="bg-blue-600 text-white p-4">
      <h1 class="text-xl font-bold">Vue.js User Interface</h1>
    </nav>
    <div class="container mx-auto mt-6 p-4 bg-white rounded shadow-md">
      <h2 class="text-lg font-semibold mb-4">Hồ sơ cá nhân</h2>
      <div class="flex items-center space-x-4">
        <img :src="profile.avatar" alt="Avatar" class="w-16 h-16 rounded-full border" />
        <div>
          <h3 class="text-xl font-bold">{{ profile.name }}</h3>
          <p class="text-gray-600">{{ profile.email }}</p>
        </div>
      </div>
      <button 
        @click="editProfile" 
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Chỉnh sửa hồ sơ
      </button>
    </div>
  </div>
</template>

<script>
import Header from '../Home/Header.vue';
export default {
  data() {
    return {
      profile: {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        avatar: 'https://via.placeholder.com/150'
      }
    };
  },
  methods: {
    editProfile() {
      alert('Chức năng chỉnh sửa hồ sơ đang phát triển!');
    }
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>
