import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { App, Platform, ActionSheetController } from 'ionic-angular';
import { HarvestedHistoryPage } from '../pages/Mandor/HarvestedHistory/HarvestedHistory';
import { HarvestBunchesPage } from '../pages/Mandor/HarvestBunches/HarvestBunches';
import { SettingsPage } from '../pages/Shared/Settings/Settings';
import { MandorHomePage } from '../pages/Mandor/MandorHome/MandorHome';
import { CountBunchesPage } from '../pages/Surveyor/CountBunches/CountBunches';
import { CountBunchesHistoryPage } from '../pages/Surveyor/CountBunchesHistory/CountBunchesHistory';
import { SurveyorHomePage } from '../pages/Surveyor/SurveyorHome/SurveyorHome';

import 'rxjs/add/operator/map';

@Injectable()
export class MainMenu {
  navCtrl: any;
  constructor(public app: App, public http: Http, public actionsheetCtrl: ActionSheetController) {
    this.navCtrl = this.app.getActiveNav();
    console.log('Hello ActionSheet Provider');
  }
  public testMe() {
    console.log('Hello Test Provider');

  }
  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Home',
          icon: 'home',
          handler: () => {
            this.navCtrl.setRoot(MandorHomePage);
          }
        },
        {
          text: 'Harvest Bunches',
          icon: 'cut',
          handler: () => {
            this.navCtrl.setRoot(HarvestBunchesPage);
          }
        },
        {
          text: 'Harvested History',
          icon: 'bus',
          handler: () => {
            this.navCtrl.setRoot(HarvestedHistoryPage);
          }
        },
        {
          text: 'Settings',
          icon: 'settings',
          handler: () => {
            this.navCtrl.setRoot(SettingsPage);
          }
        }]
    });
    actionSheet.present();
  }

  // openSurveyorMenu() {
  //   let actionSheet = this.actionsheetCtrl.create({
  //     cssClass: 'action-sheets-basic-page',
  //     buttons: [
  //       {
  //         text: 'Home',
  //         icon: 'home',
  //         handler: () => {
  //           this.navCtrl.setRoot(SurveyorHomePage);
  //         }
  //       },
  //       {
  //         text: 'Count Bunches',
  //         icon: 'cut',
  //         handler: () => {
  //           this.navCtrl.setRoot(CountBunchesPage);
  //         }
  //       },
  //       {
  //         text: 'Count Buches History',
  //         icon: 'bus',
  //         handler: () => {
  //           this.navCtrl.setRoot(CountBunchesHistoryPage);
  //         }
  //       },
  //       {
  //         text: 'Settings',
  //         icon: 'settings',
  //         handler: () => {
  //           this.navCtrl.setRoot(SettingsPage);
  //         }
  //       }]
  //   });
  //   actionSheet.present();
  // }
}
