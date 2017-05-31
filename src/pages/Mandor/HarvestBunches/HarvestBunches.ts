import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Platform, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HarvestedHistoryPage } from '../HarvestedHistory/HarvestedHistory';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { MandorHomePage } from '../MandorHome/MandorHome';
import { SettingsPage } from '../../Shared/Settings/Settings';
import { MainMenu } from "../../../providers/MainMenu";

@Component({
    selector: 'page-HarvestBunches',
    templateUrl: 'HarvestBunches.html'
})
export class HarvestBunchesPage {
    items: any;
    AddTransaction: FormGroup;
    labelsFromStorage: any;
    // private mainMenu:MainMenu,
    constructor(public actionsheetCtrl: ActionSheetController, private storage: Storage,
        public platform: Platform, public toastCtrl: ToastController, public navCtrl: NavController, public http: Http, public _form: FormBuilder, public navParams: NavParams, public alertCtrl: AlertController) {
        this.getLanguage();
        var url = "http://api.zen.com.my/api/v2/esawitdb/_table/master_location?api_key=b34c8b6e26a41f07dee48513714a534920f647cd48f299e9f28410a86d8a2cb4";
        this.http.get(url).map(res => res.json()).subscribe(data => {
            this.items = data["resource"];
        });

        this.AddTransaction = this._form.group({
            "location_GUID": ["", Validators.required],
            "bunch_count": ["", Validators.required],
            "harvested_date": ["", Validators.required]
        });
    }
    getLanguage() {
        this.storage.get('language').then(lang => {
            var url = "assets/Languages/" + lang + ".json";
            console.log("val", url);
            this.http.get(url).map(res => res.json()).subscribe(data => {
                this.labelsFromStorage = data["LanguageData"];
            });
        });
    }
    //     openGlobalMenu(){
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

    onLink(url: string) {
        window.open(url);
    }


    submitCount() {
        var queryHeaders = new Headers();
        queryHeaders.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: queryHeaders });
        this.showConfirm();
    }
    showConfirm() {
        let confirm = this.alertCtrl.create({
            title: 'Create New Count?',
            message: 'Do you really want to add new count with given values?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.http
                            .post('http://api.zen.com.my/api/v2/esawitdb/_table/transact_harvest?api_key=b34c8b6e26a41f07dee48513714a534920f647cd48f299e9f28410a86d8a2cb4', Array.of(this.AddTransaction.value))
                            .subscribe((response) => {
                                this.showToast('bottom', 'New Record Successfully Added');
                                this.navCtrl.push(HarvestedHistoryPage);

                            }, (error) => {
                                this.showToast('bottom', 'Failed to Submit');
                            });
                    }
                }
            ]
        });
        confirm.present();
    }

    showToast(position: string, tostMessage: string) {
        let toast = this.toastCtrl.create({
            message: tostMessage,
            duration: 2000,
            position: position
        });

        toast.present(toast);
    }
}




