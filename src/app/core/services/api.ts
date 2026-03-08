import { Injectable } from '@angular/core';
import { Observable , of , delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly simulationDelay = 500;

  get<T>(data: T) : Observable<T> {
    return of(data).pipe(delay(this.simulationDelay));
  }

  post<T>(data: T) : Observable<T> {
    return of(data).pipe(delay(this.simulationDelay));
  }

}
