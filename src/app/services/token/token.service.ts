import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private apiUrl = `${environment.API_URL}/api/v1/auth`

  constructor(
    private http: HttpClient
  ) { }
}
