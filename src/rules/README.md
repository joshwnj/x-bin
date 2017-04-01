# Rules

This directory is for documentation of business rules.

Where possible, modules should export data and functions, as well as documenting the rules in comments.

## Auth

- all users must login with google auth (via [`express-google-oauth`](https://github.com/x-team/express-google-oauth))
- set `env.GOOGLE_AUTH_WHITELIST` to a comma-separated list of allowed email addressess
  - can also use a wildcard, eg. `*@yourdomain.com`

- only authed users can read or write

- by default all docs are _"any authed user with the link can view"_

## Creating a new doc

- route: `/new`
- page shows:
  - richtext editor (via `medium-editor`)

## Viewing a doc

- route: `/doc/:id`

## Editing a doc

- route: `/doc/:id/edit`
- only the original author can edit

## Markdown previews

- set `env.DOC_THEME` to a directory containing theme files

## API

`POST /api/doc`

- create a new doc

`PUT /api/doc/:id`

- update a doc
