import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DocComponent } from './doc/doc.component';
import { NoteComponent } from './note/note.component';
import { TreeComponent } from './org-chart/tree/tree.component';
import { OrgChartComponent } from './org-chart/org-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DocComponent,
    NoteComponent,
    TreeComponent,
    OrgChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}