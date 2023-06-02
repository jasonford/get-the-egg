import { BrowserAgent, vuePersistentComponent } from '@knowlearning/agents'
import App from './App.vue'

window.Agent = BrowserAgent()

vuePersistentComponent(App)
