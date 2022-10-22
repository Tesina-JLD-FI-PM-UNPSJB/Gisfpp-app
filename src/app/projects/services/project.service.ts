import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Project, ProjectDTO } from '../model/Project.model';

import { environment } from '../../../environments/environment';
import { NotificationsService } from 'src/app/core/services/notifications.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects: Project[] = [];

  constructor(
    private restClient: HttpClient,
    private notificationService: NotificationsService
  ) {}

  private handleError = (error: HttpErrorResponse) => {
    if (error.status === 0) {
      // A client-side or network error occurred.
      this.notificationService.pushError(error.message);
    } else {
      // The backend returned an unsuccessful response code.
      const message = `${error.status} - ${error.error.detail}`;
      this.notificationService.pushError(message);
    }

    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  };

  public saveNewProject(project: Project): Observable<Project> {
    return this.restClient
      .post<ProjectDTO>(environment.uriProjects, project.getData())
      .pipe(
        map((data) => {
          let result = new Project();
          result.setData(data);
          return result;
        }),
        catchError(this.handleError)
      );
  }

  public getAllProjects(): Observable<Project[]> {
    return this.restClient.get<ProjectDTO[]>(environment.uriProjects).pipe(
      map((resp) =>
        resp.map((item) => {
          let result = new Project();
          result.setData(item);
          return result;
        })
      ),
      catchError(this.handleError)
    );
  }
}
