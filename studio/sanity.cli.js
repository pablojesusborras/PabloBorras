const { readFileSync } = require('fs')
const { join } = require('path')
const { defineCliConfig } = require('sanity/cli')

// Leer y parsear el archivo .env manualmente
const envPath = join(__dirname, '.env')

let projectId = ''
let dataset = 'production'

try {
  const envContent = readFileSync(envPath, 'utf-8')
  const envVars = {}
  
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=')
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim()
      }
    }
  })
  
  projectId = envVars['SANITY_STUDIO_PROJECT_ID'] || ''
  dataset = envVars['SANITY_STUDIO_DATASET'] || 'production'
} catch (error) {
  console.error('Error loading .env file:', error.message)
}

module.exports = defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  project: {
    hostname: 'pablo-borras',
  },
  studioHost: 'pablo-borras',
})
