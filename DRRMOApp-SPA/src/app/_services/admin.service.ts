import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getUsersWithRoles() {
    return this.http.get(this.baseUrl + 'admin/usersWithRoles');
  }

  // tslint:disable-next-line: typedef
  updateUserRoles(user: User, roles: {}) {
    return this.http.post(this.baseUrl + 'admin/editRoles/' + user.userName, roles);
  }

  // tslint:disable-next-line: typedef
  getPhotosForApproval() {
    return this.http.get(this.baseUrl + 'admin/photosForModeration');
  }

  // tslint:disable-next-line: typedef
  approvePhoto(photoId: number) {
    return this.http.post(this.baseUrl + 'admin/approvePhoto/' + photoId, {});
  }

  // tslint:disable-next-line: typedef
  rejectPhoto(photoId: number) {
    return this.http.post(this.baseUrl + 'admin/rejectPhoto/' + photoId, {});
  }

}
