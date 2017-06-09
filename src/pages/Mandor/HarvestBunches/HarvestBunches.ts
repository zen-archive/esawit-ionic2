import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Platform, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HarvestedHistoryPage } from '../HarvestedHistory/HarvestedHistory';
import { Observable } from 'rxjs/Observable';
import $ from "jquery";
import { HarvestBunchesModel } from '../../../models/HarvestBunches';
import { LoadBunchesModel } from '../../../models/LoadBunches';
import * as constants from '../../../config/constants';

@Component({
    selector: 'page-HarvestBunches',
    templateUrl: 'HarvestBunches.html'
})
export class HarvestBunchesPage {
    // today: number = Date.now();
    locationFromDB: any;
    vehicleFromDB: any;
    driverFromDB: any;
    loggedInUser: string;
    harvestModel: HarvestBunchesModel = new HarvestBunchesModel();
    loadModel: LoadBunchesModel = new LoadBunchesModel();
    constructor(public actionsheetCtrl: ActionSheetController,
        public platform: Platform, public toastCtrl: ToastController, public navCtrl: NavController, public http: Http, public _form: FormBuilder, public navParams: NavParams, public alertCtrl: AlertController) {

        this.loggedInUser = "4b368185-49bc-11e7-bb9f-00155de7e742";
        var url = "http://api.zen.com.my/api/v2/esawitdb/_table/active_users_location_view?filter=user_GUID=" + this.loggedInUser + "&api_key=b34c8b6e26a41f07dee48513714a534920f647cd48f299e9f28410a86d8a2cb4";
        this.http.get(url).map(res => res.json()).subscribe(data => {
            this.locationFromDB = data["resource"];
            // console.table(this.locationFromDB);
        });

        var url = "http://api.zen.com.my/api/v2/esawitdb/_table/master_vehicle?api_key=b34c8b6e26a41f07dee48513714a534920f647cd48f299e9f28410a86d8a2cb4";
        this.http.get(url).map(res => res.json()).subscribe(data => {
            this.vehicleFromDB = data["resource"];
        });

        var url = "http://api.zen.com.my/api/v2/esawitdb/_table/master_driver?api_key=b34c8b6e26a41f07dee48513714a534920f647cd48f299e9f28410a86d8a2cb4";
        this.http.get(url).map(res => res.json()).subscribe(data => {
            this.driverFromDB = data["resource"];
        });
    }

    loadBunches(selectedLocation: string, selectedVehicle: string, selectedDriver, loadedCount: number) {
        this.loadModel.location_GUID = selectedLocation;
        this.loadModel.vehicle_GUID = selectedVehicle;
        this.loadModel.driver_GUID = selectedDriver;
        this.loadModel.user_GUID = selectedDriver;
        this.loadModel.bunch_count = loadedCount;
        this.showConfirm('http://api.zen.com.my/api/v2/esawitdb/_table/transact_loading', this.loadModel.toJson(true));
    }
    onLocationSelect(selectedLocation: string) {
    }

    submitCount(location: string, bunch_count: number) {
        this.harvestModel.location_GUID = location;
        this.harvestModel.bunch_count = bunch_count; var myDate = new Date();
        this.harvestModel.createdby_GUID = "ssh";
        let options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false
        };
        var secondDate = new Date().toLocaleDateString("en-GB", options);
        // myDate.getDate()+"/"+myDate.getMonth()+"/"+myDate.getFullYear()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds()
        //    new Date(myDate.getFullYear(),myDate.getMonth(),myDate.getDate(),myDate.getHours(),myDate.getMinutes(),myDate.getSeconds());
        this.harvestModel.created_ts = secondDate;
        // myDate.getDate()+"/"+myDate.getMonth()+"/"+myDate.getFullYear()+" "+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
        // var queryHeaders = new Headers();
        // queryHeaders.append('Content-Type', 'application/json');
        // let options = new RequestOptions({ headers: queryHeaders });
        // console.log(location);
        this.showConfirm('http://api.zen.com.my/api/v2/esawitdb/_table/transact_harvest', this.harvestModel.toJson(true));
    }
    submitLoad() {

    }
    showConfirm(url: string, myModel: any) {
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

                        var queryHeaders = new Headers();
                        queryHeaders.append('Content-Type', 'application/json');
                        queryHeaders.append('X-Dreamfactory-API-Key', constants.DREAMFACTORY_API_KEY);

                        let options = new RequestOptions({ headers: queryHeaders });

                        this.http
                            .post(url, myModel, options)
                            .subscribe((response) => {
                                console.log(response);
                                this.showToast('bottom', 'New Record Successfully Added');
                                // this.navCtrl.push(HarvestedHistoryPage);

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

    // getLanguage() {
    //     this.storage.get('language').then(lang => {
    //         var url = "assets/Languages/" + lang + ".json";
    //         console.log("val", url);
    //         this.http.get(url).map(res => res.json()).subscribe(data => {
    //             this.labelsFromStorage = data["LanguageData"];
    //         });
    //     });
    // }
    //     openGlobalMenu(){
    // this.mainMenu.openMenu();
    //     }


    // openMenu() {
    //     let actionSheet = this.actionsheetCtrl.create({
    //         cssClass: 'action-sheets-basic-page',
    //         buttons: [
    //             {
    //                 text: 'Home',
    //                 icon: 'home',
    //                 handler: () => {
    //                     this.navCtrl.setRoot(MandorHomePage);

    //                 }
    //             },
    //             {
    //                 text: 'Harvest Bunches',
    //                 icon: 'cut',
    //                 handler: () => {
    //                     this.navCtrl.setRoot(HarvestBunchesPage);
    //                 }
    //             },
    //             {
    //                 text: 'Harvested History',
    //                 icon: 'bus',
    //                 handler: () => {
    //                     this.navCtrl.setRoot(HarvestedHistoryPage);
    //                 }
    //             },
    //             {
    //                 text: 'Settings',
    //                 icon: 'settings',
    //                 handler: () => {
    //                     this.navCtrl.setRoot(SettingsPage);
    //                 }
    //             }]


    //     });
    //     actionSheet.present();
    // }

    onLink(url: string) {
        window.open(url);
    }


}




