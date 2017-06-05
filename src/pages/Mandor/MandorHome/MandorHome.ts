﻿import { Component } from '@angular/core';
import { NavController, Platform, ActionSheetController } from 'ionic-angular';
import { HarvestedHistoryPage } from '../HarvestedHistory/HarvestedHistory';
import { HarvestBunchesPage } from '../HarvestBunches/HarvestBunches';
import { MainMenu } from "../../../providers/MainMenu";

@Component({
    selector: 'page-home',
    templateUrl: 'MandorHome.html'
})
export class MandorHomePage {

    constructor(private mainMenu: MainMenu, public navCtrl: NavController, public platform: Platform, public actionsheetCtrl: ActionSheetController) {

    }

    onLink(url: string) {
        window.open(url);
    }
    openGlobalMenu() {
        this.mainMenu.openMenu();
    }

    public NewHarvest() {
        this.navCtrl.push(HarvestBunchesPage, {});
    }
    public GetHistory() {
        this.navCtrl.push(HarvestedHistoryPage, {});
    }
}
