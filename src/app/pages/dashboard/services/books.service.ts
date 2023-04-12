import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBook } from '../interfaces/IBook';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  urlBase: string = environment.baseUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${this.urlBase}/books`);
  }

  deleteBook(id: string) {
    return this.http.delete(`${this.urlBase}/books/${id}`);
  }

  createBook({name, author}: { name: string, author: string}) {
    return this.http.post<IBook>(`${this.urlBase}/books`, { name, author }, this.httpOptions);
  }

  updateBook({id, name, author}: { id: string, name: string, author: string}) {
    return this.http.put<IBook>(`${this.urlBase}/books/${id}`, { name, author }, this.httpOptions);
  }
}
