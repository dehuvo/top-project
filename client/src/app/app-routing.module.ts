import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DocComponent } from './doc/doc.component';
import { NoteComponent } from './note/note.component';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { MainComponent} from './main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'doc', component: DocComponent },
  { path: 'note', component: NoteComponent },
  { path: 'org-chart', component: OrgChartComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}