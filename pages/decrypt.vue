<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { decryptData } from '~/utils/crypto';

const encryptedText = ref('')
const decryptText   = ref('')
const secretKey     = ref('')
const { copy, copied, isSupported } = useClipboard()

const decrypt = async () => {
  decryptText.value = JSON.parse(decryptData(encryptedText.value, secretKey.value))
}
</script>

<template>
  <div class="flex items-center justify-center mt-10">
    <div class="w-1/2">
      <form @submit.prevent="decrypt">
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Secret key</label>
        <input v-model="secretKey" class="mb-5 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Insert secret key" />
        
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your encrypt data</label>
        <textarea v-model="encryptedText" id="message" rows="10" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your encrypt data here..."></textarea>
        
        <button :disabled="!encryptedText || !secretKey" type="submit" class="mt-6 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 disabled:bg-blue-400">
          Decrypt data
        </button>
      </form>
    </div>
  </div>
  <div v-if="decryptText" class="border-2 border-gray-300 rounded-lg p-4 m-10 relative">
    <div class="absolute top-1 right-2">
      <div v-if="isSupported">
        <button @click="copy(JSON.stringify(decryptText))" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
          <span v-if="!copied">Copy</span>
          <span v-else>Copied!</span>
        </button>
      </div>
      <p v-else>
        Your browser does not support Clipboard API
      </p>
    </div>
    <pre class="text-xs">{{ decryptText }}</pre>
  </div>
</template>
