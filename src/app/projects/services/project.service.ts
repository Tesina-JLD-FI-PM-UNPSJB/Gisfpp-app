import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Project, ProjectDTO } from '../model/Project.model';

import { environment } from '../../../environments/environment';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { PageResponse } from 'src/app/core/models/PageResponse.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

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
          return this.mappingProject(data);
        }),
        catchError(this.handleError)
      );
  }

  public getPageProjects(numberPage: number = 1, sizePage: number = 10): Observable<PageResponse<Project>> {
    const params = new HttpParams()
                    .set('numberPage', numberPage)
                    .set('sizePage', sizePage);
    return this.restClient.get<PageResponse<ProjectDTO>>(environment.uriProjects, {params}).pipe(
      map((resp) => this.processPage(resp)),
      catchError(this.handleError)
    );
  }

  private processPage(page: PageResponse<ProjectDTO>): PageResponse<Project> {
    let result: PageResponse<Project> = {};
    result.hasMoreElements = page.hasMoreElements;
    result.numberPage = page.numberPage;
    result.sizePage = page.sizePage;
    result.totalElements = page.totalElements;
    result.result = this.processResultPage(page.result || []);

    return result;
  }

  private processResultPage(items: ProjectDTO[]): Project[] | undefined {
    return items.map( proj => {
      return this.mappingProject(proj);
    });
  }

  private mappingProject(proj: ProjectDTO) {
    const result = new Project();
    result.setData(proj);
    return result;
  }
}
