// settings-manager.component.ts

import { Component, inject, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ThemeService, type Brand } from "@design-system/tokens";
import { TranslateDirective, TranslatePipe, TranslateService } from "@ngx-translate/core";

@Component({
    standalone: true,
    imports: [TranslatePipe, TranslateDirective],
    selector: "sb-settings-manager",
    template: `
    <div>
      <ng-content></ng-content>
    </div>
  `,
})
export class SettingsManagerComponent implements OnChanges {
    @Input() locale: string = "en";
    @Input() brand: Brand = "default";

    private translate = inject(TranslateService);
    private themeService = inject(ThemeService);

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes)
        // If the locale prop has change, update the active locale
        if (changes["locale"]) {
            const changedProp = changes["locale"];
            this.translate.use(changedProp.currentValue);
        }
        if (changes["brand"]) {
            const changedProp = changes["brand"];
            this.themeService.initializeTokens(changedProp.currentValue);
        }
    }
}