type KeyMap = { [K: string]: any }
type A1<T> = T extends (a1: infer I, ...rest: any[]) => any ? I : never
type A2<T> = T extends (a1: any, a2: infer I, ...rest: any[]) => any ? I : never
type MT<T> = (state: A1<T>) => void
type CM<T> = (store: any) => void
type AC<T> = (store: any) => Promise<any>
type DP<T> = (store: any) => Promise<any>
type MTPL<T> = (state: A1<T>, payload: A2<T>) => void
type CMPL<T> = (store: any, payload: A2<T>) => void
type ACPL<T> = (store: any, payload: A2<T>) => Promise<any>
type DPPL<T> = (store: any, payload: A2<T>) => Promise<any>
type Mutation<T> = MT<T> | MTPL<T>
type Action<T> = AC<T> | ACPL<T>
type Committer<T> = T extends MT<T> ? CM<T> : CMPL<T>
type Dispatcher<T> = T extends AC<T> ? DP<T> : DPPL<T>
type Types<T> = { readonly [K in keyof T]: string }
type Mutations<T> = { readonly [K in keyof T]: Mutation<T[K]> }
type Actions<T> = { readonly [K in keyof T]: Action<T[K]> }
type Committers<T> = { readonly [K in keyof T]: Committer<T[K]> }
type Dispatchers<T> = { readonly [K in keyof T]: Dispatcher<T[K]> }
type Injects<T> = { [P in keyof T]?: T[P] }
type Modeler<T> = (injects?: Injects<T>) => T

interface FromMutationsReturn<M> {
  readonly mutationTypes: Types<M>
  readonly committers: Committers<M>
}
interface FromActionsReturn<A> {
  readonly dispatchTypes: Types<A>
  readonly dispatchers: Dispatchers<A>
}
declare function fromMutations<M extends KeyMap & Mutations<M>>(
  mutations: M,
  namespace: string
): FromMutationsReturn<M>
declare function fromActions<A extends KeyMap & Actions<A>>(
  actions: A,
  namespace: string
): FromActionsReturn<A>

export {
  KeyMap,
  Types,
  Mutations,
  Actions,
  Committers,
  Dispatchers,
  Injects,
  Modeler,
  FromMutationsReturn,
  FromActionsReturn,
  fromMutations,
  fromActions
}
