﻿import { Component } from '@angular/core';
import { NavController, Platform, ActionSheetController } from 'ionic-angular';
import { HarvestBunchesPage } from '../../Mandor/HarvestBunches/HarvestBunches';
import { MainMenu } from "../../../providers/MainMenu";
import { SurveyorHomePage } from '../../Surveyor/SurveyorHome/SurveyorHome';
import { FactoryHomePage } from '../../Factory/FactoryHome/FactoryHome';
import { SettingsPage } from '../Settings/Settings';

@Component({
    selector: 'page-login',
    templateUrl: 'Login.html'
})
export class LoginPage {
        today: number = Date.now();
    constructor(private mainMenu: MainMenu, public navCtrl: NavController, public platform: Platform, public actionsheetCtrl: ActionSheetController) {
        var myDate = new Date();
        let options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false
        };
        var secondDate = new Date().toLocaleDateString("en-GB", options);
        console.log(secondDate);
        // console.log( myDate.getDate()+"/"+myDate.getMonth()+"/"+myDate.getFullYear()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds());
        // console.log(this.today | date:'y-M-d H:m:s');
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
        this.navCtrl.setRoot(HarvestBunchesPage);
    }
    public loginFactory() {
        this.navCtrl.setRoot(FactoryHomePage);
    }
    public Settings() {
        this.navCtrl.push(SettingsPage, {});
    }
}
