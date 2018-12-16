import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent} from './main/main.component';
import { DocComponent } from './doc/doc.component';
import { NoteComponent } from './note/note.component';
import { OrgChartComponent } from './org-chart/org-chart.component';

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: MainComponent },
    { path: 'doc', component: DocComponent },
    { path: 'note', component: NoteComponent },
    { path: 'org-chart', component: OrgChartComponent }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {}