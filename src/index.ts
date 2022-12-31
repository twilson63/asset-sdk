import { EnvironmentType, Environment, SDK, AtomicAsset, AtomicAssetType } from './types'
import services from './services/index'
import api from './lib/index'

const sdk: SDK = {
  init(env: EnvironmentType) {
    env = Environment.parse(env)
    const svc = services(env)
    return {
      create: (asset: AtomicAssetType) => {
        asset = AtomicAsset.parse(asset)
        return api(svc).createAsset(asset)
      },
      get: (id: string) => api(svc).getAsset(id),
      stamp: (id: string) => api(svc).stampAsset(id),
      list: (groupId: string) => api(svc).getItemsByGroupId(groupId)
    }
  }
}
export default sdk