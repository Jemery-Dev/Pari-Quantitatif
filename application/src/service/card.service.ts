import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private baseUrl = 'http://localhost:3000/cards';

  constructor(private http: HttpClient) { }

  getAllCards(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

}
