import { componentWrapperDecorator, moduleMetadata } from "@storybook/angular";
import { SettingsManagerComponent } from "./settings-manager";

export const decorators = [
    moduleMetadata({
        imports: [SettingsManagerComponent],
    }),
    (story: any, context: any) => {
        const { locale, brand } = context.globals;

        return componentWrapperDecorator(SettingsManagerComponent, { locale, brand })(story, context)
    },
]