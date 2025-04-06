<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { useStore } from '@/store'

const store = useStore()
const router = useRouter()
const username = ref('')
const password = ref('')
const toastMessage = ref('') // Holds the error message
const showToast = ref(false) // Controls the visibility of the error message

const onLogin = async () => {
  console.log(`Username: ${username.value}, Password: ${password.value}`)

  if (!username.value || !password.value) {
    toastMessage.value = 'Please enter both username and password.'
    showToast.value = true
    return
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      username.value,
      password.value
    )
    console.log('User logged in:', userCredential.user)
    store.setUser(userCredential.user) // Store user in Vuex store
    router.push({ name: 'home' })
  } catch (error) {
    console.error('Error logging in:', error)
    toastMessage.value = 'Login failed. Please check your credentials.'
    showToast.value = true
  }
}
</script>

<template>
  <section class="section vh-100">
    <div class="container">
      <div class="section-heading text-center mb-4">
        <h3>Password Keeper</h3>
      </div>

      <div
        class="shadow-sm p-4 mb-5 bg-body rounded"
        style="max-width: 400px; margin: auto"
      >
        <form @submit.prevent="onLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="username"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              required
            />
          </div>

          <!-- Error Message -->
          <div v-if="showToast" class="text-danger mb-3">
            {{ toastMessage }}
          </div>

          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
    <Footer />
  </section>
</template>
