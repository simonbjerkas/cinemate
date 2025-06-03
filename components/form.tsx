'use client';

import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { TextEditor } from './text-editor';

import { Star } from 'lucide-react';

import { cn } from '@/lib/utils';

import { useFieldContext, useFormContext } from '@/hooks/form';

export function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>();
  return (
    <Label className="flex flex-col gap-2">
      <div>{label}</div>
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
    <form.Subscribe selector={state => state.isSubmitting}>
      {isSubmitting => (
        <Button type="submit" disabled={isSubmitting}>
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
