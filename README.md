# x-bin

Like pastebin, but whitelabeled and more profesh.

## Local dev

- copy `docker/web.env.dist` to `docker/web.env`, and customize
- ensure `redis-server` is running

```
export $(cat docker/web.env | grep -v ^# | xargs)
node src/server
```
