import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError as observableThrowError } from "rxjs";
import { environment as env } from 'src/environments/environment';


@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'x-rapidapi-key': `${env.RAPID_API_KEY}`,
        'x-rapidapi-host': `${env.RAPID_API_HOST}`,
      },
      setParams: {
        key: `${env.RAWG_API_KEY}`
      }
    });

    return next.handle(req);
  }
}
