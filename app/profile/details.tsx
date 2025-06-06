'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { useState } from 'react';
import { useAppForm } from '@/hooks/form';
import { useMutation } from 'convex/react';
import { useConvexQuery } from '@/hooks/convex';

import { z } from 'zod';
import { api } from '@/convex/_generated/api';

export function ProfileDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const updateUser = useMutation(api.profiles.updateProfile);
  const { data: profile } = useConvexQuery(api.profiles.getProfile);

  const form = useAppForm({
    defaultValues: {
      name: profile?.name || '',
    },
    validators: {
      onChange: z.object({
        name: z.string().min(1),
      }),
    },
    onSubmit: async ({ value }) => {
      await updateUser({
        data: {
          name: value.name,
        },
      })
        .then(() => {
          setIsEditing(false);
        })
        .catch(error => {
          console.error(error);
        });
    },
  });

  return (
    <>
      {isEditing ? (
        <form
          className="flex flex-col gap-2"
          onSubmit={e => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.AppField
            name="name"
            children={field => {
              return <field.TextField label="Name" />;
            }}
          />
          <form.AppForm>
            <form.SubscribeButton label="Save" />
          </form.AppForm>
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </form>
      ) : (
        <div className="flex flex-col gap-2">
          <Label>Name</Label>
          <p className="text-muted-foreground">{profile?.name}</p>
          <Button className="mt-4" variant="outline" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </div>
      )}
    </>
  );
}
