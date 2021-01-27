import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { libro } from '../interfaces/libro';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private endpoint =
    'https://angularfirebase-ba5f2-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  postLibro(libro: libro) {
    return this.http.post(`${this.endpoint}/biblioteca.json`, libro).pipe(
      map((res: any) => {
        libro.id = res.name;
        return libro;
      })
    );
  }

  putLibro(libro: libro) {
    const libroAux = {
      ...libro,
    };
    delete libroAux.id;

    return this.http.put(
      `${this.endpoint}/biblioteca/${libro.id}.json`,
      libroAux
    );
  }

  getLibros() {
    return this.http
      .get(`${this.endpoint}/biblioteca.json`)
      .pipe(map(this.mapearParaFor));
  }

  getLibro(id: string) {
    return this.http.get(`${this.endpoint}/biblioteca/${id}.json`);
  }

  deleteLibro(id: string) {
    return this.http.delete(`${this.endpoint}/biblioteca/${id}.json`);
  }

  private mapearParaFor(libroObject: object) {
    const biblioteca: libro[] = [];

    if (libroObject === null) {
      return [];
    }

    Object.keys(libroObject).forEach((key) => {
      const libro: libro = libroObject[key];
      libro.id = key;
      biblioteca.push(libro);
    });

    return biblioteca;
  }
}
