import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HandleError, HttpErrorHandler } from '../http-error-handler/http-error-handler.service';
import { Subject, Observable } from 'rxjs';
import { Contact } from 'src/app/models/models';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private baseUrl: string = environment.contactsEndpoint;
  private handleError: HandleError;

  private subjectContact = new Subject<Contact>();
  private subjectContacts = new Subject<Contact[]>();

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler) {
    this.handleError = this.httpErrorHandler.createHandleError("ContactService");
  }

  readContacts(): Observable<Contact[]> {
    return this.subjectContacts.asObservable();
  }

  readContact(): Observable<Contact> {
    return this.subjectContact.asObservable();
  }


  /* Calls */

  getContacts() {
    const url = [this.baseUrl, ''].join('/');
    this.http.get<Contact[]>(url)
      .pipe(
        catchError(this.handleError('getContacts', [])))
      .subscribe(_ => this.subjectContacts.next(_));
  }

  getContact(id: number) {
    const url = [this.baseUrl, id].join('/');
    this.http.get<Contact>(url)
      .pipe(
        catchError(this.handleError('getContact', null)))
      .subscribe(_ => this.subjectContact.next(_));
  }

  postContact(contact: Contact) {
    const url = [this.baseUrl, ''].join('/');
    return this.http.post(url, contact)
      .pipe(
        catchError(this.handleError('postContact')));
  }

  putContact(contact: Contact) {
    const url = [this.baseUrl, contact.ContactId].join('/');
    return this.http.put(url, contact)
      .pipe(
        catchError(this.handleError(['putContact', contact.ContactId].join('/'))));
  }

  deleteContact(id: number) {
    const url = [this.baseUrl, id].join('/');
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError(['deleteContact', id].join('/'))));
  }
}
