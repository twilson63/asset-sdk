import { ReaderT, Async } from 'crocks'

const { of, ask, lift } = ReaderT(Async)

export const CreateAsset = (asset) => of({ ok: true })