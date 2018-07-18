type KeyMap = { [K: string]: any }
type A1<T> = T extends (a1: infer I, ...rest: any[]) => any ? I : never
type A2<T> = T extends (a1: any, a2: infer I, ...rest: any[]) => any ? I : never

type MT<T> = (state: A1<T>) => void
type AC = (store: any) => Promise<any>
type CM = (store: any) => void
type DP = (store: any) => void

type MTPL<T> = (state: A1<T>, payload: A2<T>) => void
type ACPL<T> = (store: A1<T>, payload: A2<T>) => Promise<any>
type CMPL<T> = (store, payload: A2<T>) => void
type DPPL<T> = (store, payload: A2<T>) => void

type Mutation<T> = MT<T> | MTPL<T>
type Action<T> = AC | ACPL<T>

type Committer<T> = T extends MT<T> ? CM : CMPL<T>
type Dispatcher<T> = T extends AC ? DP : DPPL<T>

type Types<T> = { readonly [K in keyof T]: string }
type Mutations<T> = { readonly [K in keyof T]: Mutation<T[K]> }
type Actions<T> = { readonly [K in keyof T]: Action<T[K]> }
type Committers<T> = { readonly [K in keyof T]: Committer<T[K]> }
type Dispatchers<T> = { readonly [K in keyof T]: Dispatcher<T[K]> }

interface FromMutationsReturn<M> {
  readonly commitTypes: Types<M>
  readonly committers: Committers<M>
}
interface FromActionsReturn<A> {
  readonly dispatchTypes: Types<A>
  readonly dispatchers: Dispatchers<A>
}

type Injects<T> = { [P in keyof T]?: T[P] }
type Modeler<T> = (injects?: Injects<T>) => T

export {
  KeyMap,
  Mutations,
  Actions,
  Types,
  Committers,
  Dispatchers,
  FromMutationsReturn,
  FromActionsReturn,
  Injects,
  Modeler
}