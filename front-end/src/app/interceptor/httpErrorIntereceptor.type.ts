import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
 
  /**
   *
   */
  constructor(private snackBar:MatSnackBar) {
    
    
  }
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          }
          else {

            console.log(error);
            if (error.error.showMessage){
              this.snackBar.open(error.error.message,'',{                
                verticalPosition:'top',
                horizontalPosition:'center',
                panelClass:'snack-bar-error',
                duration:5000

              });
              console.log('show message',error.error.message)
            }
            
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          //console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}