import { JanusClient } from '@vtex/api'

export class PostalCodeClient extends JanusClient {
  public async getAddress(postalCode: string): Promise<PostalCodeResponse> {
    return this.http.get(`/api/checkout/pub/postal-code/BRA/${postalCode}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }
}
