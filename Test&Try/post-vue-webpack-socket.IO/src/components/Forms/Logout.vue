<template>
  
</template>

<script>
import { logout } from '@/services/user'
export default {
  created() {
    logout()
    this.$router.push({ path: '/' })        
  }
}
</script>
