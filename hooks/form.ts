import { createFormHookContexts, createFormHook } from '@tanstack/react-form';
import {
  TextField,
  SubscribeButton,
  TextEditorField,
  StarRatingField,
  CheckboxField,
  RadioField,
} from '@/components/form';

export const { formContext, fieldContext, useFieldContext, useFormContext } = createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextEditorField,
    StarRatingField,
    CheckboxField,
    RadioField,
  },
  formComponents: {
    SubscribeButton,
  },
});
