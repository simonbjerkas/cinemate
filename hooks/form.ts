import { createFormHookContexts, createFormHook } from '@tanstack/react-form';
import { TextField, SubscribeButton, TextEditorField, StarRatingField } from '@/components/form';

export const { formContext, fieldContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextEditorField,
    StarRatingField,
  },
  formComponents: {
    SubscribeButton,
  },
});
