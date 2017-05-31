import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { MandorHomePage } from '../pages/Mandor/MandorHome/MandorHome';
// import { HarvestedHistoryPage } from '../pages/Mandor/HarvestedHistory/HarvestedHistory';
// import { HarvestBunchesPage } from '../pages/Mandor/HarvestBunches/HarvestBunches';
// import {SettingsPage} from '../pages/Shared/Settings/Settings';
import {MainMenu} from "../providers/MainMenu";
import {LoginPage} from '../pages/Shared/Login/Login';

@Component({
  templateUrl: 'app.html',
  providers:[MainMenu]
})
export class MyApp { 
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public mainMenu:MainMenu,public platform: Platform) {
    this.initializeApp();

    this.pages = [
        { title: 'Home', component: MandorHomePage }    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
