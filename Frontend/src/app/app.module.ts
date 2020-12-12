import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PostsService } from './services/posts.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertifyService } from './services/alertify.service';
import { AdminPanelComponent } from './adminPanel/adminPanel.component';
import { PostTableComponent } from './postTable/postTable.component';

const appRoutes: Routes = [
  {path: '', component: AdminPanelComponent}
]

@NgModule({
  declarations: [
    AppComponent,
      AdminPanelComponent,
      PostTableComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PostsService,
    AlertifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
