import {
  KeyMap,
  Actions,
  Types,
  Dispatchers,
  FromActionsReturn
} from '../typings/index.d'

const namespaced: KeyMap = {}

function fromActions<A extends KeyMap & Actions<A>>(
  actions: A,
  namespace: string
): FromActionsReturn<A> {
  if (
    namespaced[namespace] !== undefined &&
    process.env.NODE_ENV !== 'development'
  ) {
    throw new Error(
      `vuex-FromMutationsReturn: conflict namespace -> ${namespace}`
    )
  } else {
    namespaced[namespace] = namespace
  }
  const dispatchTypes: KeyMap = {}
  const dispatchers: KeyMap = {}
  Object.keys(actions).forEach(key => {
    const type = `${namespace}/${key}`
    dispatchTypes[key] = type
    dispatchers[key] = (store: any, payload?: any) => {
      store.dispatch(type, payload, { root: true })
    }
  })
  return {
    dispatchTypes: dispatchTypes as Types<A>,
    dispatchers: dispatchers as Dispatchers<A>
  }
}

export { fromActions }