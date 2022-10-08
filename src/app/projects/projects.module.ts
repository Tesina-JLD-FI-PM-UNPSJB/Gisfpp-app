import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ClarityModule } from '@clr/angular';

import { ListProjectsComponent } from './components/list-projects/list-projects.component';
import { ProjectsPanelComponent } from './components/projects-panel/projects-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormProjectComponent } from './components/form-project/form-project.component';
import { NewProjectComponent } from './components/new-project/new-project.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPanelComponent,
    children: [
      { path: 'list', component: ListProjectsComponent},
      { path: 'new', component: NewProjectComponent }
    ]
  }
]

@NgModule({
  declarations: [
    ListProjectsComponent,
    ProjectsPanelComponent,
    FormProjectComponent,
    NewProjectComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ClarityModule
  ],
  exports: [RouterModule]
})
export class ProjectsModule { }
