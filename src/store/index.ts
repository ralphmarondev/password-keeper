import { getAuth, signOut } from 'firebase/auth'
import { defineStore } from 'pinia'

export interface State {
  count: number
  user: object | null
  token: string | null
}

export const useStore = defineStore('store', {
  state: (): State => ({
    count: 0,
    user: null,
    token: null,
  }),
  actions: {
    increment() {
      this.count++
      console.log('incremented', this.count)
    },
    // set user and token
    setUser(user: object | null) {
      this.user = user
      if (user) {
        const auth = getAuth()
        auth.currentUser?.getIdToken().then((token) => {
          this.token = token
          localStorage.setItem('authToken', token)
          localStorage.setItem(
            'authTokenExpiry',
            (Date.now() + 10 * 60 * 1000).toString()
          )
        })
      } else {
        this.token = null
        localStorage.removeItem('authToken')
        localStorage.removeItem('authTokenExpiry')
      }
    },
    // check if token is expired
    checkTokenExpiry() {
      const expiry = localStorage.getItem('authTokenExpiry')
      if (expiry && Date.now() > parseInt(expiry)) {
        this.logout()
      }
    },
    // logout user
    logout() {
      const auth = getAuth()
      signOut(auth).then(() => {
        this.setUser(null)
      })
    },
  },
})
