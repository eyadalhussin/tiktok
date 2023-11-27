import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TikTokComponent } from './tik-tok/tik-tok.component';
import { TikTokCommentComponent } from './tik-tok/tik-tok-comment/tik-tok-comment.component';
import { TikTokFriendsComponent } from './tik-tok/tik-tok-friends/tik-tok-friends.component';
import { TikTokInboxComponent } from './tik-tok/tik-tok-inbox/tik-tok-inbox.component';
import { TikTokInputBarComponent } from './tik-tok/tik-tok-input-bar/tik-tok-input-bar.component';
import { TikTokLoadingComponent } from './tik-tok/tik-tok-loading/tik-tok-loading.component';
import { TikTokMainComponent } from './tik-tok/tik-tok-main/tik-tok-main.component';
import { TikTokPostComponent } from './tik-tok/tik-tok-post/tik-tok-post.component';
import { TikTokProfileComponent } from './tik-tok/tik-tok-profile/tik-tok-profile.component';
import { TikTokSearchComponent } from './tik-tok/tik-tok-search/tik-tok-search.component';
import { TikTokSeekBarComponent } from './tik-tok/tik-tok-seek-bar/tik-tok-seek-bar.component';
import { TikTokUserComponent } from './tik-tok/tik-tok-user/tik-tok-user.component';
import { TikTokVideoComponent } from './tik-tok/tik-tok-video/tik-tok-video.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TikTokComponent,
    TikTokCommentComponent,
    TikTokFriendsComponent,
    TikTokInboxComponent,
    TikTokInputBarComponent,
    TikTokLoadingComponent,
    TikTokMainComponent,
    TikTokPostComponent,
    TikTokProfileComponent,
    TikTokSearchComponent,
    TikTokSeekBarComponent,
    TikTokUserComponent,
    TikTokVideoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
