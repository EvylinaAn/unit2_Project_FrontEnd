import { ref } from 'vue'
import { useCookies } from 'vue3-cookies'
import { decodeCredential } from 'vue3-google-login'

const { cookies } = useCookies()
export const isLoggedIn = ref(false)
export const userName = ref('')
export const userSub = ref('')
export const userEmail = ref('')

export const checkSession = () => {
  if (cookies.isKey('user_session')) {
    isLoggedIn.value = true
    const userData = decodeCredential(cookies.get('user_session'))
    userName.value = userData.given_name
    userSub.value = userData.sub
    userEmail.value = userData.email
  }
}