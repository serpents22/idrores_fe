import { defineStore } from 'pinia'
import router from '@/router'
import authAPI from '@/services/authAPI'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('auth.user'),
    token: localStorage.getItem('auth.token'),
    status: ref({
      message: null,
      code: null,
    }),
    isLoading: ref(false)
  }),
  actions: {

    async signUp(data) {
      this.isLoading = true
      try {
        const res = await authAPI.signUp(data)
        console.log(res)
        this.isLoading = false
        this.status.message = 'Account Created'
        this.status.code = res.data.status
        router.push({ name: 'EmailConfirmation' });
      } catch (err) {
        console.error(err)
        this.isLoading = false
        this.status.message = err.response.data.error
        this.status.code = err.response.data.status
        return err
      }
    },

    async signIn(data) {
      this.isLoading = true
      try {
        const res = await authAPI.signIn(data)
        console.log(res.data.data.user.first_name)
        this.user = res.data.data.user
        this.isLoading = false
        this.token = res.data.data.token.token;
        this.status.message = 'Login Successful'
        this.status.code = res.data.status
        localStorage.setItem('auth.token', res.data.data.token.token)
        localStorage.setItem('auth.user', res.data.data.user.first_name)
        router.push({ name: 'Dashboard' });
      } catch (err) {
        console.error(err)
        this.isLoading = false
        this.status.message = "Error on registration" //err.response.data.error
        if (err.response.data.error == 'E_ROW_NOT_FOUND: Row not found') {
          this.status.message = 'Email not Registered'
        } else if (err.response.data.error == 'E_INVALID_AUTH_PASSWORD: Password mis-match') {
          this.status.message = 'Password missmatch'
        }
        this.status.code = err.response.data.status
        return err
      }
    },

    async signOut() {
      try {
        await authAPI.signOut()
        this.user = null;
        localStorage.removeItem('auth.token');
        localStorage.removeItem('auth.user')
        router.push({ name: 'LoginForm' });
      } catch (err) {
        console.error(err)
        return err
      }

    },

    async deleteAccount(data) {
      this.isLoading = true
      try {
        const res = await authAPI.deleteAccount(data)
        this.isLoading = false
        this.status.message = 'Password reset email successfully sent'
        localStorage.removeItem('auth.token');
        localStorage.removeItem('auth.user')
        router.push({ name: 'LoginForm' });
      } catch (err) {
        this.isLoading = false
        this.status.message = "Account deletion failed"
        return err
      }
    },

    async forgotPassword(data) {

      this.isLoading = true
      try {
        const res = await authAPI.forgotPassword(data,localStorage.getItem('locale'))
        this.isLoading = false
        this.status.message = 'Password reset email successfully sent'
      } catch (err) {
        this.isLoading = false
        this.status.message = "Password not resetting"//err.response.data.error.errors[0].message
        return err
      }
    },

    async newPassword(data, email, signature) {
      this.isLoading = true
      try {
        await authAPI.newPassword(data, email, signature)
        this.isLoading = false
        router.push({ name: 'ResetPasswordConfirmation' });
      } catch (err) {
        console.error(err)
        this.isLoading = false
        return err
      }
    },

  }

})