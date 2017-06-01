# esawit
eSawit App


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
