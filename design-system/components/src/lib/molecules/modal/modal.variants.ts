import { cva, type VariantProps } from 'class-variance-authority';

export const modalVariants = cva(
  'fixed inset-0 z-50 flex items-center justify-center p-4',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-2xl',
        full: 'max-w-full m-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type ModalVariants = VariantProps<typeof modalVariants>;
