import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Platform, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcceptedBunchesHistoryPage } from '../AcceptedBunchesHistory/AcceptedBunchesHistory';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'page-AcceptBunches',
    templateUrl: 'AcceptBunches.html'
})
export class AcceptBunchesPage {

    locationFromDb:any;
    vehicleFromDb:any;
    driverFromDb:any;
    AddTransaction: FormGroup;

    constructor(public actionsheetCtrl: ActionSheetController,
        public platform: Platform, public toastCtrl: ToastController, public navCtrl: NavController, public http: Http, public _form: FormBuilder, public navParams: NavParams, public alertCtrl: AlertController) {

        var url = "http://api.zen.com.my/api/v2/esawitdb/_table/active_vehicle_location_view?api_key=b34c8b6e26a41f07dee48513714a534920f647cd48f299e9f28410a86d8a2cb4";
        this.http.get(url).map(res => res.json()).subscribe(data => {
            this.locationFromDb = data["resource"];
        });

           url = "http://api.zen.com.my/api/v2/esawitdb/_table/master_driver?api_key=b34c8b6e26a41f07dee48513714a534920f647cd48f299e9f28410a86d8a2cb4";
        this.http.get(url).map(res => res.json()).subscribe(data => {
            this.driverFromDb = data["resource"];
        });

           url = "http://api.zen.com.my/api/v2/esawitdb/_table/master_vehicle?api_key=b34c8b6e26a41f07dee48513714a534920f647cd48f299e9f28410a86d8a2cb4";
        this.http.get(url).map(res => res.json()).subscribe(data => {
            this.vehicleFromDb = data["resource"];
        });

        this.AddTransaction = this._form.group({
            "loading_location_GUID": ["", Validators.required],
            "bunch_count": ["", Validators.required],
            "vehicle_GUID": ["", Validators.required],
            "driver_GUID": ["", Validators.required]
        });
    }

    onLocationSelect(locationSelected:any){
         
        for(let location of this.locationFromDb){
            if(locationSelected!=location.location_GUID){
            console.log(location.registration_no);
            }
        }
      
        
    }

    //     openGlobalMenu(){
    // this.mainMenu.openMenu();
    //     }


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
                            .post('http://api.zen.com.my/api/v2/esawitdb/_table/transact_unloading?api_key=b34c8b6e26a41f07dee48513714a534920f647cd48f299e9f28410a86d8a2cb4', Array.of(this.AddTransaction.value))
                            .subscribe((response) => {
                                this.showToast('bottom', 'New Record Successfully Added');
                                this.navCtrl.push(AcceptedBunchesHistoryPage);

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




