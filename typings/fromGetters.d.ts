import { KeyMap, RA1, R, RR, Types, MapHelperOption } from './utils.d'

// ______________________________________________________
//
// @ fromGetters

// IN
type GT<T> = (getters: any, contextGetters?: any) => any
type GTR<T> = (getters: any, contextGetters?: any) => (args: any) => any
type Getter<T> = GT<T> | GTR<T>
type Getters<T> = { [K in keyof T]: Getter<T[K]> }

// OUT
type PGT<T> = (getters: any) => R<T>
type PGTR<T> = (getters: any, args: RA1<T>) => RR<T>
type ProxyGetter<T> = T extends GTR<T> ? PGTR<T> : PGT<T>
type ProxyGetters<T> = { readonly [K in keyof T]: ProxyGetter<T[K]> }
type ProxyMapGetters<T> = (
  mapGetters: Function,
  mapHelperOption: MapHelperOption<T>
) => any

interface FromGettersReturn<G> {
  readonly proxyGetters: ProxyGetters<G>
  readonly proxyMapGetters: ProxyMapGetters<G>
}

// DECL
declare function fromGetters<T extends KeyMap & Getters<T>>(
  getters: T,
  namespace: string
): FromGettersReturn<T>

// ______________________________________________________
//
// @ exports

export {
  Getters,
  ProxyGetters,
  ProxyMapGetters,
  FromGettersReturn,
  fromGetters
}