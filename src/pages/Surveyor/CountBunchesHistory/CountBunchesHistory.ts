import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Platform, ActionSheetController } from 'ionic-angular';
import { Http, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { MainMenu } from "../../../providers/MainMenu";

@Component({
    selector: 'page-history',
    templateUrl: 'CountBunchesHistory.html'
})
export class CountBunchesHistoryPage {
    labelsFromStorage: any;
    countHistoryData: any;
    constructor(private mainMenu: MainMenu, public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public viewCtrl: ViewController, public http: Http, public platform: Platform, public actionsheetCtrl: ActionSheetController) {
        this.getLanguage();
        var url = "http://api.zen.com.my/api/v2/esawitdb/_table/transact_survey_view?api_key=b34c8b6e26a41f07dee48513714a534920f647cd48f299e9f28410a86d8a2cb4";
        this.http.get(url).map(res => res.json()).subscribe(data => {
            this.countHistoryData = data["resource"];

        });
    }

    // openGlobalMenu() {
    //     this.mainMenu.openMenu();
    // }
    getLanguage() {
        this.storage.get('language').then(lang => {
            var url = "assets/Languages/" + lang + ".json";
            console.log("val", url);
            this.http.get(url).map(res => res.json()).subscribe(data => {
                this.labelsFromStorage = data["LanguageData"];
            });
        });
    }

    itemSelected(item: string) {
        console.log("Selected Item", item);
    }
}


