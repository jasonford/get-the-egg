import { browserAgent, vuePersistentComponent } from '@knowlearning/agents'
import App from './App.vue'

window.Agent = browserAgent()

vuePersistentComponent(App)
