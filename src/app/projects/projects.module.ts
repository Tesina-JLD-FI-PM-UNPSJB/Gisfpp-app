import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ClarityModule } from '@clr/angular';

import { ListProjectsComponent } from './components/list-projects/list-projects.component';
import { ProjectsPanelComponent } from './components/projects-panel/projects-panel.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPanelComponent,
    children: [
      { path: 'list', component: ListProjectsComponent}
    ]
  }
]

@NgModule({
  declarations: [
    ListProjectsComponent,
    ProjectsPanelComponent,
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
