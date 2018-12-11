import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DocComponent } from './doc/doc.component';
import { NoteComponent } from './note/note.component';
import { OrgChartComponent } from './org-chart/org-chart.component';
import { TreeComponent } from './org-chart/tree/tree.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    DocComponent,
    NoteComponent,
    TreeComponent,
    OrgChartComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}