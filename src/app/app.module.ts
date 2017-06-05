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

import { AcceptBunchesPage } from '../pages/Factory/AcceptBunches/AcceptBunches';
import { AcceptedBunchesHistoryPage } from '../pages/Factory/AcceptedBunchesHistory/AcceptedBunchesHistory';
import { FactoryHomePage } from '../pages/Factory/FactoryHome/FactoryHome';


// Translation Service:
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    MyApp,
      MandorHomePage, HarvestedHistoryPage, HarvestBunchesPage,
      SettingsPage,LoginPage,
      SurveyorHomePage,CountBunchesPage,CountBunchesHistoryPage,
      AcceptBunchesPage,AcceptedBunchesHistoryPage,FactoryHomePage
  ],
imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }
  })
],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
      MandorHomePage, HarvestedHistoryPage, HarvestBunchesPage,
      SettingsPage,LoginPage,
      SurveyorHomePage,CountBunchesPage,CountBunchesHistoryPage,
      AcceptBunchesPage,AcceptedBunchesHistoryPage,FactoryHomePage

  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Storage]
})
export class AppModule {}
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
