import { Injectable } from '@angular/core';
import { RemoteService } from './remote.service';
import {Observable,of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import 'rxjs/Rx';


export interface Category {
  id: number;
  name: string;
  description: string;
}

@Injectable()
export class CategoriesRestService {
  baseUrl: string = 'http://localhost:3000/api/categories';
  rootKey: string = 'category';
  rootKeyPlural: string = 'categories';

  constructor(private remote: RemoteService) {}

  getList(): Observable<Category[]> {
    return this.remote.get(this.baseUrl)
    .pipe(map(res => res.json()[this.rootKeyPlural]));
  }

  create(category: Category): Observable<Category> {
    return this.remote.post(this.baseUrl, this.rootedJson(category))
      .pipe(map(res => res.json()[this.rootKey]));
  }

  private rootedJson(category: Category): string {
    let data = {};
    data[this.rootKey] = category;
    return JSON.stringify(data, (key, value) => value === undefined ? null : value);
  }
}
