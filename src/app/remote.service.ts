import { Injectable } from '@angular/core';
import {
  Http, Headers, RequestOptions, Response,
  RequestOptionsArgs
} from '@angular/http';
// import { Observable } from "rxjs/Observable";
import {Observable,of, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs/Rx';

@Injectable()
export class RemoteService {
  constructor(protected http: Http) {
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.get(url, this.addHeaders(options))
    .pipe(
      catchError(this.handleError.bind(this))
    );
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.post(url, body, this.addHeaders(options))
    .pipe(
      catchError(this.handleError.bind(this))
    );
  }

  patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.patch(url, body, this.addHeaders(options))
    .pipe(
      catchError(this.handleError.bind(this))
    );
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.http.delete(url, this.addHeaders(options))
    .pipe(
      catchError(this.handleError.bind(this))
    );
  }

  protected handleError(error: any): Observable<any> {
    if (error.status !== 422) {
      // Handle error responses
    }
    return Observable.throw(error);
  }

  protected addHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {
    options = options || new RequestOptions();
    if (!options.headers) options.headers = new Headers();
    options.headers.set('Content-Type', 'application/json');
    return options;
  }
}
