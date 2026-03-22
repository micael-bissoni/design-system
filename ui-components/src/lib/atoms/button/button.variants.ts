import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
    'inline-flex items-center py-2 px-4 rounded-button justify-center font-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            intent: {
                primary: 'bg-primary text-on-primary hover:opacity-90 shadow-md',
                secondary: 'bg-secondary text-on-secondary border border-secondary hover:bg-secondary/90',
                tertiary: 'bg-tertiary text-on-tertiary border border-tertiary hover:bg-tertiary/90',
                outline: 'bg-transparent border border-primary text-primary hover:bg-primary/5',
                ghost: 'bg-transparent text-primary hover:bg-primary/5',
                link: 'bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto',
                success: 'bg-success text-on-success border border-success hover:bg-success/90',
                danger: 'bg-danger text-on-danger border border-danger hover:bg-danger/90',
                warning: 'bg-warning text-on-warning border border-warning hover:bg-warning/90',
                info: 'bg-info text-on-info border border-info hover:bg-info/90',
            },
            size: {
                small: 'text-sm rounded-sm',
                medium: 'text-md rounded-md',
                large: 'text-lg rounded-lg',
            },
            fullWidth: {
                true: 'w-full',
                false: ''
            }
        },
        defaultVariants: {
            intent: 'primary',
            size: 'medium',
            fullWidth: false,
        }
    }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
