# Second page

Welcome to the second page of this complex indexing test. You may already have come across the [first page](first.md) of this test. If not, make sur to check it out to understand what is happening here.

## Remaining features

In the previous page, we already tested the `tables` and `lists`. So we are going to test out the remaining features of the indexer.

### Images

Might look like nothing, but images are kind of useless for indexing.

![This image right here](https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png)

should not be indexed.

### Code blocks

```javascript
export default {
    title: 'This code should not be indexed at all`,
}
```

### Html

<div>
Believe if or not, this is supported by marked. But it is not possible to index HTML: it would be very difficult.
</div>
