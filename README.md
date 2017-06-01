# esawit
eSawit App

Contributors:
    Khairulnizam
    Shabbeer

Getting started:
    Once pulled from github, do the following:
    1. Open node.js command prompt
    2. Change folder to location of project
    3. Issue command: 'npm link'
    4. Test with: 'ionic serve' or 'ionic serve -l'


i18n using angular-translate:
Steps:
1. npm install @ngx-translate/core @ngx-translate/http-loader
2. Edit (one-time only) 'src/app/app.module.ts'
    a. Add: 
        import { HttpModule, Http } from '@angular/http';
        import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
        import { TranslateHttpLoader } from '@ngx-translate/http-loader';
    b. Add: 
        imports: [
                IonicModule.forRoot(MyApp),
                TranslateModule.forRoot({
                loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
                }
            })
        ],
    c. Add: 
        export function createTranslateLoader(http: Http) {
             return new TranslateHttpLoader(http, './assets/i18n/', '.json');
            }
3. Edit (one-time only) 'src/app/app.component.ts'
    a. Replace:   
            constructor(public mainMenu:MainMenu,public platform: Platform) {
        with:
            constructor(public platform: Platform, translate: TranslateService) {
                translate.setDefaultLang('en');
4. Create folder 'src/assets/i18n'
5. Create/edit file 'xx.json' in 'src/assets/i18n', where 'xx' is language code, e.g: 'en', structured sample:
        {
        "_TITLE": "eSawit",
        "_NAME": "Name",
        }
6. Edit mainmenu.ts:
    a. Add: import { TranslateService } from '@ngx-translate/core';
    b. Inject: 
      constructor(public app: App, public http: Http, public actionsheetCtrl: ActionSheetController, public translate: TranslateService) {
    c. In OpenMenu(), add menu item texts as i.e:
         let home_btn = this.translate.get("_HOME")["value"];
    d. In 'buttons', change to i.e:
            buttons: [
                {
                text: home_btn,
                icon: 'home',
                handler: () => {
                    this.navCtrl.setRoot(MandorHomePage);
                }
