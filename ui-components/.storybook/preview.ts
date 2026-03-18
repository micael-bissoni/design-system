import {
    ApplicationConfig,
    DEFAULT_CURRENCY_CODE,
    inject,
    LOCALE_ID,
    provideZonelessChangeDetection,
    APP_INITIALIZER,
} from '@angular/core';
import {
    provideTranslateService,
    provideTranslateLoader,
} from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient } from '@angular/common/http';
import { applicationConfig, type Preview } from '@storybook/angular';
import { DatePipe } from '@angular/common';

import { ThemeService, brandColors, provideThemeService } from '@design-system/tokens';

import '@angular/common/locales/global/en';
import '@angular/common/locales/global/pt';
import '@angular/common/locales/global/es';

const brandItems = Object.keys(brandColors).map(key => ({
    value: key,
    title: key.charAt(0).toUpperCase() + key.slice(1),
}));

const preview: Preview = {
    globalTypes: {
        theme: {
            description: 'Global color mode',
            defaultValue: 'light',
            toolbar: {
                title: 'Mode',
                icon: 'circlehollow',
                items: [
                    { value: 'light', icon: 'circlehollow', title: 'Light Mode' },
                    { value: 'dark', icon: 'circle', title: 'Dark Mode' },
                ],
                dynamicTitle: true,
            },
        },
        brand: {
            description: 'Global brand theme',
            defaultValue: 'default',
            toolbar: {
                title: 'Brand',
                icon: 'paintbrush',
                items: brandItems,
                dynamicTitle: true,
            },
        },
        locale: {
            description: 'Internationalization locale',
            defaultValue: 'en-GB',
            toolbar: {
                title: 'Language',
                icon: 'globe',
                items: [
                    { value: 'en-GB', right: '🇬🇧', title: 'English' },
                    { value: 'pt-PT', right: '🇵🇹', title: 'Português' },
                    { value: 'es-ES', right: '🇪🇸', title: 'Español' },
                ],
                dynamicTitle: true,
            },
        },
        currency: {
            description: 'Currency for price displays',
            defaultValue: 'GBP',
            toolbar: {
                title: 'Currency',
                icon: 'credit',
                items: [
                    { value: 'GBP', right: '£', title: 'GBP' },
                    { value: 'EUR', right: '€', title: 'EUR' },
                ],
                dynamicTitle: true,
            },
        },
    },
    parameters: {
        options: {
            storySort: {
                order: ['Design System', ['Introduction', 'Foundations', '*'], '*'],
            },
        },
    },
    decorators: [
        applicationConfig({
            providers: [
                provideZonelessChangeDetection(),
                provideHttpClient(),
            ],
        }),
        (storyFn, context) => {
            const { theme, brand, currency } = context.globals;
            let { locale } = context.globals;
            locale = locale || 'en-GB';
            const html = document.documentElement;
            if (theme === 'dark') {
                html.classList.add('dark');
            } else {
                html.classList.remove('dark');
            }

            // Apply brand data attribute for Style Dictionary tokens
            html.setAttribute('data-brand', brand || 'default');

            // Set localization and currency data attributes
            html.setAttribute('lang', locale);
            html.setAttribute('data-currency', currency || 'GBP');

            const story = storyFn(context);

            return {
                ...story,
                applicationConfig: {
                    ...(story.applicationConfig || { providers: [] }),
                    providers: [
                        ...(story.applicationConfig?.providers || []),
                        provideThemeService(brand as any)
                    ],
                },
                moduleMetadata: {
                    ...(story.moduleMetadata || {}),
                    imports: [...(story.moduleMetadata?.imports || [])],
                    providers: [
                        ...(story.moduleMetadata?.providers || []),
                        { provide: DEFAULT_CURRENCY_CODE, useValue: currency },
                        DatePipe,
                        { provide: LOCALE_ID, useValue: locale },
                        provideTranslateService({
                            loader: provideTranslateHttpLoader({
                                prefix: '/assets/i18n/',
                                suffix: '.json',
                            }),
                            fallbackLang: locale,
                            lang: locale,
                        }),
                    ],
                },
            };
        },
    ],
};

export default preview;
