import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicoURL: string = `https://api.giphy.com/v1/gifs`
  private apiKey: string = `UTQSOO6Os4pa4H9M9IgwjF1KsTgVgsbP`
  private _historial: string[] = []
  public resultados: Gif[] = []


  get historal() {
    return [...this._historial]
  }


  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('ultimoResultado')!) || []
  }


  buscarGifs(query: string) {

    query = query.trim().toLocaleLowerCase()

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.slice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial))

    }


    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);



    //Peticion http
    this.http.get<SearchGifsResponse>(`${this.servicoURL}/search`, { params: params })
      .subscribe(resp => {
        this.resultados = resp.data
        localStorage.setItem('ultimoResultado', JSON.stringify(this.resultados))

      })


  }

}
