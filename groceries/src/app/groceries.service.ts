import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroceriesServicesService {
  items: any = [];
  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;
  baseURL = 'http://localhost:8080';

  constructor(public http: HttpClient) {
    console.log('Welcome Grocery Service...');
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  getItems(): Observable<object[]> {
    console.log('call.getItems');
    return this.http
      .get(this.baseURL + '/api/groceries', {
        headers: { Accepts: 'application/json' },
      })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  private extractData(res: Response) {
    const body = res;
    return (body || {}) as object[];
  }

  // Error handler for retrieving data from an end point
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return throwError(errMsg);
  }

  // Post - end point to add an entry using CRUD operation
  addItem(n) {
    this.http
      .post(this.baseURL + '/api/groceries', n, {
        headers: { Accepts: 'application/json' },
      })
      .subscribe((res) => {
        this.items = res;
        this.dataChangeSubject.next(true);
      });
  }

  // Put - end point to update by CRUD operation
  editItem(n, id) {
    this.http.put(this.baseURL + '/api/groceries/' + id, n).subscribe((res) => {
      this.items[id] = res;
      this.dataChangeSubject.next(true);
    });
  }

  // Delete - end point to be performed by CRUD operation
  removeItem(n, i) {
    this.http.delete(this.baseURL + '/api/groceries/' + n).subscribe((res) => {
      console.log(res);
      this.dataChangeSubject.next(true);
    });
  }
}
