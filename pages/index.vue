<script setup lang="ts">
const myIframe  = ref<HTMLIFrameElement | null>(null)
const message   = ref('')
const signedUrl = ref('')
const isOpen    = ref(false)
const step      = ref('modal') //modal or iframe

onMounted(async () => {
  await nextTick()
  isOpen.value = true
  window.addEventListener('message', handleMessage);
})

const handleMessage = (event: any) => {
  if (event.data.source === 'privy-2fa-sdk' || event.data.source === 'privypass_liveness'){
    console.log(event.data.source)
    message.value = event.data
  }
}

const handleSignedUrl = () => {
  isOpen.value = false
  step.value = 'iframe'
}
</script>

<template>
  <div v-if="step === 'modal'">
    <UModal v-model="isOpen" prevent-close class="w-24">
      <div class="p-4">
        <UInput size="lg" v-model="signedUrl" placeholder="Insert signed url"/>
        <UButton size="lg" @click="handleSignedUrl" class="mt-5" :disabled="!signedUrl">Signed URL</UButton>
      </div>
    </UModal>
  </div>
  <div v-else class="grid grid-cols-12 h-screen">
    <div class="col-span-8 bg-red-white">
      <iframe ref="myIframe" allow="geolocation;camera;accelerometer;gyroscope"
        class="iframe-wrapper border w-full h-screen" :src="signedUrl" />
    </div>
    <div class="col-span-4 m-auto">
      <h1 class="text-2xl mb-4">Post Message Response</h1>
      <div class="border-2 p-5 border-dashed border-red-700">
        <pre>{{ message }}</pre>
      </div>
    </div>
  </div>
</template>
