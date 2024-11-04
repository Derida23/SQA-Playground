import CryptoJS from 'crypto-js'

export function encryptData (text: string, secretKey: string) {
  const key       = CryptoJS.SHA256(secretKey)
  const iv        = CryptoJS.lib.WordArray.random(16)
  const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv })
  return `${iv.toString(CryptoJS.enc.Hex)}:${encrypted.toString()}`
}

export function decryptData (encryptedText: string, secretKey: string) {
  const [ivHex, encrypted] = encryptedText.split(':')
  const iv                 = CryptoJS.enc.Hex.parse(ivHex)
  const key                = CryptoJS.SHA256(secretKey)
  const decrypted          = CryptoJS.AES.decrypt(encrypted, key, { iv: iv })
  return decrypted.toString(CryptoJS.enc.Utf8)
}
