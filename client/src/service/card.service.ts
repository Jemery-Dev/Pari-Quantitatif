import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private baseUrl = 'http://localhost:3000/cards';

  constructor(private http: HttpClient) { }

  getAllCards(): Observable<any> {
    return this.http.get(this.baseUrl)
  }
  

  addCategory(category: { nom: string }): Observable<any> {
    return this.http.post(this.baseUrl, category);
  }

  deleteCategory(categoryId: string): Observable<any> {
    const url = `${this.baseUrl}/${categoryId}`;
    return this.http.delete(url);
  }

  addCardsToCategory(categoryId: string, cards: {theme: string}): Observable<any> {
    const url = `${this.baseUrl}/${categoryId}/cartes`;
    return this.http.post(url, cards);
  }

}
