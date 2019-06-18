import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { Telephone } from 'src/app/models/models';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler/http-error-handler.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TelephonesService {
  private baseUrl: string = environment.telephonesEndpoint;
  private handleError: HandleError;

  private subjectTelephones = new Subject<Telephone[]>();
  private subjectTelephone = new Subject<Telephone>();

  constructor(private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler) {
    this.handleError = this.httpErrorHandler.createHandleError('TelephoneService');
  }

  readTelephones(): Observable<Telephone[]> {
    return this.subjectTelephones.asObservable();
  }

  readTelephone(): Observable<Telephone> {
    return this.subjectTelephone.asObservable();
  }

  /* Calls */

  getTelephones(contactId: number) {
    const url = [this.baseUrl, 'contact', contactId].join('/');
    this.http.get<Telephone[]>(url)
      .pipe(
        catchError(this.handleError('getTelephones', [])))
      .subscribe(_ => this.subjectTelephones.next(_));
  }

  getTelephone(id: number) {
    const url = [this.baseUrl, id].join('/');
    this.http.get<Telephone>(url)
      .pipe(
        catchError(this.handleError(['getTelephone', id].join('/'), null)))
      .subscribe(_ => this.subjectTelephone.next(_));
  }

  postTelephone(telephone: Telephone) {
    const url = [this.baseUrl, ''].join('/');
    return this.http.post(url, telephone)
      .pipe(
        catchError(this.handleError('postTelephone')));
  }

  putTelephone(telephone: Telephone) {
    const url = [this.baseUrl, telephone.TelephoneId].join('/');
    return this.http.put(url, telephone)
      .pipe(
        catchError(this.handleError(['putTelephone', telephone.TelephoneId].join('/'))));
  }

  deleteTelephone(id: number) {
    const url = [this.baseUrl, id].join('/');
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError(['deleteTelephone', id].join('/')))
      );
  }
}
