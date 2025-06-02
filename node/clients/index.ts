import { IOClients } from '@vtex/api'

import { PostalCodeClient } from './PostalCodeClient'

export class Clients extends IOClients {
  public get address() {
    return this.getOrSet('address', PostalCodeClient)
  }
}
