import { EnvironmentType, Environment, SDK } from './types'
import services from './services/index'
import api from './lib/index'

const sdk: SDK = {
  init(env: EnvironmentType) {
    env = Environment.parse(env)
    const svc = services(env)
    return {
      get: (id: string, type: string) => api(svc).getAsset(id, type)
    }
  }
}
export default sdk