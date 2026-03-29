import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
    'flex-1 py-1.5 outline-none text-sm font-bold placeholder:text-gray-medium bg-transparent text-gray-dark',
    {
        variants: {
            variant: {
                default: '',
                ghost: 'border-none',
            },
        },
        defaultVariants: {
            variant: 'default',
        }
    }
);

export type InputVariants = VariantProps<typeof inputVariants>;
