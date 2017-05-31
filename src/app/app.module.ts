import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {Storage} from "@ionic/storage";
// import {MainMenu} from "../providers/MainMenu";

import { MandorHomePage } from '../pages/Mandor/MandorHome/MandorHome';
import { HarvestedHistoryPage } from '../pages/Mandor/HarvestedHistory/HarvestedHistory';
import { HarvestBunchesPage } from '../pages/Mandor/HarvestBunches/HarvestBunches';
import {SettingsPage} from '../pages/Shared/Settings/Settings';
import {LoginPage} from '../pages/Shared/Login/Login';

import { CountBunchesPage } from '../pages/Surveyor/CountBunches/CountBunches';
import { CountBunchesHistoryPage } from '../pages/Surveyor/CountBunchesHistory/CountBunchesHistory';
import { SurveyorHomePage } from '../pages/Surveyor/SurveyorHome/SurveyorHome';

@NgModule({
  declarations: [
    MyApp,
      MandorHomePage, HarvestedHistoryPage, HarvestBunchesPage,
      SettingsPage,LoginPage,
      SurveyorHomePage,CountBunchesPage,CountBunchesHistoryPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
      MandorHomePage, HarvestedHistoryPage, HarvestBunchesPage,
      SettingsPage,LoginPage,
      SurveyorHomePage,CountBunchesPage,CountBunchesHistoryPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Storage]
})
export class AppModule {}
