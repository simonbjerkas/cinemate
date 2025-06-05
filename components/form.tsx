'use client';

import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { TextEditor } from './text-editor';

import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

import { useFieldContext, useFormContext } from '@/hooks/form';

export function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>();
  return (
    <Label className="flex flex-col items-start gap-2">
      <div>{label}</div>
      {field.state.meta.errors.length > 0 && (
        <p className="text-xs text-red-500">{field.state.meta.errors[0].message}</p>
      )}
      <Input value={field.state.value} onChange={e => field.handleChange(e.target.value)} />
    </Label>
  );
}

export function TextEditorField({ label, menubar = true }: { label: string; menubar?: boolean }) {
  const field = useFieldContext<string>();
  const editorId = `editor-${label.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <div className="flex size-full flex-col items-start gap-2 overflow-y-auto">
      <Label htmlFor={editorId}>{label}</Label>
      {field.state.meta.errors.length > 0 && (
        <p className="text-xs text-red-500">{field.state.meta.errors[0].message}</p>
      )}
      <TextEditor
        name={editorId}
        id={editorId}
        value={field.state.value}
        menubar={menubar}
        onChange={e => field.handleChange(e.toString())}
      />
    </div>
  );
}

export function SubscribeButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={state => state.isSubmitting || state.isDefaultValue}>
      {isSubmitting => (
        <Button type="submit" disabled={isSubmitting} className="mt-4">
          {label}
        </Button>
      )}
    </form.Subscribe>
  );
}

export function StarRatingField({ label }: { label: string }) {
  const field = useFieldContext<number>();
  return (
    <Label className="flex flex-col items-start gap-2">
      <div>{label}</div>
      {field.state.meta.errors.length > 0 && (
        <p className="text-xs text-red-500">{field.state.meta.errors[0].message}</p>
      )}
      <RadioGroup
        className="flex flex-row gap-1"
        value={field.state.value.toString()}
        onValueChange={value => field.handleChange(Number(value))}
      >
        {[1, 2, 3, 4, 5].map(star => (
          <div key={star}>
            <RadioGroupItem value={star.toString()} id={`star-${star}`} className="sr-only" />
            <Label htmlFor={`star-${star}`}>
              <Star
                className={cn(
                  'hover:text-primary size-6 transition-colors',
                  star <= field.state.value ? 'fill-primary text-primary' : 'fill-none',
                )}
              />
            </Label>
          </div>
        ))}
      </RadioGroup>
    </Label>
  );
}

export function RadioField({ label, options }: { label: string; options: { label: string; value: string }[] }) {
  const field = useFieldContext<string>();
  return (
    <Label className="flex flex-col items-start gap-2">
      <div>{label}</div>
      {field.state.meta.errors.length > 0 && (
        <p className="text-xs text-red-500">{field.state.meta.errors[0].message}</p>
      )}
      <RadioGroup value={field.state.value} onValueChange={value => field.handleChange(value)}>
        {options.map(({ label, value }) => (
          <div key={value} className="flex items-center gap-2">
            <RadioGroupItem value={value} id={value} />
            <Label htmlFor={value}>{label}</Label>
          </div>
        ))}
      </RadioGroup>
    </Label>
  );
}

export function CheckboxField({ label }: { label: string }) {
  const field = useFieldContext<boolean>();
  return (
    <Label className="flex flex-row items-start gap-2">
      <Checkbox
        id={label}
        checked={field.state.value}
        onCheckedChange={checked => field.handleChange(checked === 'indeterminate' ? false : checked)}
      />
      <div>
        {label}
        {field.state.meta.errors.length > 0 && (
          <p className="text-xs text-red-500">{field.state.meta.errors[0].message}</p>
        )}
      </div>
    </Label>
  );
}
