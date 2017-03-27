# x-bin

Like pastebin, but whitelabeled and more profesh.

## Local dev

- copy `docker/web.env.dist` to `docker/web.env`, and customize
- `docker-compose up`

```
export $(cat docker/web.env | grep -v ^# | xargs)
npm start
```

## Check flow types

To check: `npm run flow`

When adding new dependencies, remember to run `flow-typed install` to get new interface libs.

Or run `npm run flow:coverage` to generate a coverage report
