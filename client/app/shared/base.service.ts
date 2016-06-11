import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

export class BaseService {
  protected extractData(res: Response): JsendResponse {
    return res.json();
  }
  
  protected handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

export class JsendResponse {
  status: string;
  data: any;
  message: string;
}