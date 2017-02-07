# x-bin

Like pastebin, but whitelabeled and more profesh.

## Local dev

- copy `docker/web.env.dist` to `docker/web.env`, and customize
- ensure `redis-server` is running

```
export $(cat docker/web.env | grep -v ^# | xargs)
node src/server
```

## Check flow types

To check: `npm run flow`

When adding new dependencies, remember to run `flow-typed install` to get new interface libs.

Or run `npm run flow:coverage` to generate a coverage report
