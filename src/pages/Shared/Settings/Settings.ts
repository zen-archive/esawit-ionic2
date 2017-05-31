import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HarvestedHistoryPage } from '../../Mandor/HarvestedHistory/HarvestedHistory';
import { HarvestBunchesPage } from '../../Mandor/HarvestBunches/HarvestBunches';
import { MandorHomePage } from '../../Mandor/MandorHome/MandorHome';
// import {MainMenu} from "../../providers/MainMenu";

@Component({
  selector: 'page-Settings',
  templateUrl: 'Settings.html'
})
export class SettingsPage {
  items: any;
  // private mainMenu:MainMenu,
  constructor(public actionsheetCtrl: ActionSheetController, public alertCtrl: AlertController, public http: Http, private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    var url = "assets/Languages/LanguagesList.json";
    this.http.get(url).map(res => res.json()).subscribe(data => {
      this.items = data["LanguagesList"];
    });
  }
  //   openGlobalMenu(){
  // this.mainMenu.openMenu();
  //     }

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
  onSelectChange(languageSelect) {
    this.setLanguage(languageSelect);
  }

  setLanguage(lang) {
    this.storage.set('language', lang);
  }

  getLanguage() {
    this.storage.get('language').then(lang => {
      this.showAlert(lang);
    });
  }

  showAlert(language) {
    let alert = this.alertCtrl.create({
      title: 'Selected Language',
      subTitle: language,
      buttons: ['OK']
    });
    alert.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
