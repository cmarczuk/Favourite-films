import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormInputLinkComponent } from './components/form-input-link/form-input-link.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { VideosListComponent } from './components/videos-list/videos-list.component';
import { VideoModalComponent } from './components/video-modal/video-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { HeaderComponent } from './components/header/header.component';
import { VideoComponent } from './components/video/video.component';
import { DataPipe } from './data.pipe';
import { FavouriteBtnComponent } from './components/favourite-btn/favourite-btn.component';
import { DeleteBtnComponent } from './components/delete-btn/delete-btn.component';
import { VideoBoxComponent } from './components/video-box/video-box.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { VideoBoxListComponent } from './components/video-box-list/video-box-list.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ButtonsPanelComponent } from './components/buttons-panel/buttons-panel.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'favourite', component: FavouriteComponent },
  { path: 'video/:id', component: VideoComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FormInputLinkComponent,
    VideosListComponent,
    VideoModalComponent,
    HomeComponent,
    FavouriteComponent,
    HeaderComponent,
    VideoComponent,
    DataPipe,
    FavouriteBtnComponent,
    DeleteBtnComponent,
    VideoBoxComponent,
    PaginationComponent,
    VideoBoxListComponent,
    ButtonsPanelComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(routes),
    MatToolbarModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
