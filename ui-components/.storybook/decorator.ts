import { applicationConfig, componentWrapperDecorator, moduleMetadata } from "@storybook/angular";
import { SettingsManagerComponent } from "./settings-manager";
import { provideTranslateService, TranslateService } from "@ngx-translate/core";
import { LOCALE_ID, provideZonelessChangeDetection } from "@angular/core";
import { provideHttpClient } from "@angular/common/http";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";

export const decorators = [
    applicationConfig({
        providers: [
            provideZonelessChangeDetection(),
            provideHttpClient(),
            provideTranslateService({
                loader: provideTranslateHttpLoader({
                    prefix: '/assets/i18n/',
                    suffix: '.json'
                }),
                fallbackLang: 'en-GB',
                lang: 'en-GB'
            }),
            {
                provide: LOCALE_ID,
                useFactory: (translate: TranslateService) => {
                    console.log("Current language", translate.getCurrentLang());
                    return translate.getCurrentLang();
                },
                deps: [TranslateService],
            },

        ],
    }),
    moduleMetadata({
        imports: [SettingsManagerComponent],
    }),
    (story: any, context: any) => {
        const { locale, brand } = context.globals;

        return componentWrapperDecorator(SettingsManagerComponent, { locale, brand })(story, context)
    },
]