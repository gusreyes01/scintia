import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Serial } from '@ionic-native/serial/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormModalComponent } from 'src/components/form-modal/form-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormStepModalComponent } from 'src/components/form-step-modal/form-step-modal.component';
import { ProtocolService } from './services/protocol.services';
import { CycleService } from './services/cycle.services';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [AppComponent, FormModalComponent, FormStepModalComponent],
  entryComponents: [FormModalComponent, FormStepModalComponent, ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, ChartsModule],
  providers: [
    Serial,
    CycleService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
