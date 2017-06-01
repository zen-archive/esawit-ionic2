import { Component } from '@angular/core';
import { NavController, Platform, ActionSheetController } from 'ionic-angular';
import { MandorHomePage } from '../../Mandor/MandorHome/MandorHome';
import { MainMenu } from "../../../providers/MainMenu";
import { SurveyorHomePage } from '../../Surveyor/SurveyorHome/SurveyorHome';
import { SettingsPage } from '../Settings/Settings';

@Component({
    selector: 'page-login',
    templateUrl: 'Login.html'
})
export class LoginPage {
    constructor(private mainMenu: MainMenu, public navCtrl: NavController, public platform: Platform, public actionsheetCtrl: ActionSheetController) {
    }
    onLink(url: string) {
        window.open(url);
    }
    openGlobalMenu() {
        this.mainMenu.openMenu();
    }
    public loginSurveyor() {
                this.navCtrl.setRoot(SurveyorHomePage);
    }
    public loginMandor() {
                this.navCtrl.setRoot(MandorHomePage);
    }
     public loginFactory() {
                this.navCtrl.setRoot(MandorHomePage);
    }
         public Settings() {
        this.navCtrl.push(SettingsPage, {});
    }
}
