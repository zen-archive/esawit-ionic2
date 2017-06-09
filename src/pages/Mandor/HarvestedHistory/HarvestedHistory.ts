﻿import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Platform, ActionSheetController } from 'ionic-angular';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
// import { Storage } from '@ionic/storage';
// import { MainMenu } from "../../../providers/MainMenu";

@Component({
    selector: 'page-history',
    templateUrl: 'HarvestedHistory.html'
})
export class HarvestedHistoryPage {
    labelsFromStorage: any;
    harvestedHistoryData: any;
    // private storage: Storage, private mainMenu: MainMenu,
    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public http: Http, public platform: Platform, public actionsheetCtrl: ActionSheetController) {
        // this.getLanguage();
        var url = "http://api.zen.com.my/api/v2/esawitdb/_table/transact_harvest_view?api_key=b34c8b6e26a41f07dee48513714a534920f647cd48f299e9f28410a86d8a2cb4";
        this.http.get(url).map(res => res.json()).subscribe(data => {
            this.harvestedHistoryData = data["resource"];

        });
    }

    // openGlobalMenu() {
    //     this.mainMenu.openMenu();
    // }


    itemSelected(item: string) {
        console.log("Selected Item", item);
    }
}


