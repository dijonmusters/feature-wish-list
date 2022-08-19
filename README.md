# Feature Wish List

App for people to suggest new features and vote on features that they want. Built as a [Supabase Hackathon](https://supabase.com/blog/launch-week-5-hackathon) project.

## Table definition

```sql
create table if not exists public.features (
    id uuid not null primary key default uuid_generate_v4(),
    created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
    title text not null
);

create table if not exists public.votes (
    id uuid not null primary key default uuid_generate_v4(),
    created_at timestamp with time zone default timezone('utc' :: text, now()) not null,
    feature_id uuid references public.features(id) not null,
    user_id uuid references public.users(id) default auth.uid() not null
);
```
