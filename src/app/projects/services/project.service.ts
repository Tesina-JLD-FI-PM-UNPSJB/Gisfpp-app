import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project, StateProject, TypeProject } from '../model/Project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects: Project[] = [];

  constructor() {
    this.initFakeDB();
   }



  private initFakeDB() {
    let project1 = new Project();
    project1.id = 105;
    project1.code = 'COD00025';
    project1.resolutionNumber = 'TMP00004';
    project1.title = 'Proyecto de ejemplo 1';
    project1.type = TypeProject.ENTERPRISE;
    project1.state = StateProject.ACTIVE;
    project1.start = new Date(2022, 3, 15);
    project1.end = new Date(2023, 3, 14);
    project1.description = 'Esta es la descripción del proyecto uno';
    project1.detail = 'Este es el detalle del proyecto uno';

    this.projects.push(project1);

    let project2 = new Project();
    project2.id = 106;
    project2.code = 'COD00032';
    project2.resolutionNumber = 'TMP000024';
    project2.title = 'Proyecto de ejemplo 2';
    project2.type = TypeProject.EXTENSION;
    project2.state = StateProject.GENERATED;
    project2.start = new Date(2022, 3, 15);
    project2.end = new Date(2023, 3, 14);
    project2.description = 'Esta es la descripción del proyecto dos';
    project2.detail = 'Este es el detalle del proyecto dos';

    this.projects.push(project2);
  }

  public getAllProjects(): Observable<Project[]> {
    return of(this.projects);
  }
}
