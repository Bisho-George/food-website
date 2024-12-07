import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { GlobalInterceptor } from './core/interceptors/global.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDropzoneModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      useClass: GlobalInterceptor,
      multi: true,
      provide: HTTP_INTERCEPTORS
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
