<script lang="ts">
  import Markdown from '$lib/markdown/Markdown.svelte'
  import CustomHr from './CustomHr.svelte'
</script>

<body style="padding:1rem">
  <Markdown
    options={{
      baseUrl: '/docs',
    }}
    renderers={{
      hr: CustomHr,
    }}
    source={`
# someReallyLongTitleInOneline--test unique indexes
# someReallyLongTitleInOneline--test unique indexes
# someReallyLongTitleInOneline--test unique indexes
## someOther ReallyLongTitle

# Markdown Tester
## Text


------
### Ordered list
1. Here is a [relative URL](/test "with a title") that should point to \`/docs/test\`
    1. With nesting!
2. *Italic text* followed by **bold text**
3. test@email.com that should render as a link
 
And then is starts at 4

4. Test
5. Test 2

### Unordered list
- This [with](/test) a link
- Test

### Nested lists
- A 
    - A.1
    - A.2
- B
    1. B.1
    2. B.2




## Notifications
------

:::notification type="error" test="lol"
**test** this

:::tags
You,can,nest,them
:::

And add text below too!
:::

> Just a normal bloquote


## Tags 
------
**No colors**

:::tags
test,Test 3 with spaces
:::

**Valid colors**

:::tags colors="PURPLE, green, blue"
test,test1,TEST2, Test 3 with spaces
:::

**Invalid colors**

:::tags colors="aaa"
test,test1
:::

## Code blocks
------

~~~graphql
query {
  look(at: "this") {
    thing
  }
}
~~~


You can also insert \`inline\` code blocks like this: \`"this"\`
## Html 
------

<p align="center" style="padding: 1.0rem; border: solid 1px;">
  Some centered text that should be centered with a border
</p>

## Tables
------


| Animal | Emoji | Sound |
| ---------- | --------- | --------- |
| Dog        | 🐶        | Woof!     |
| Cat        | 🐱        | Meow!     |
| Cow        | 🐄        | Moo       |


### Mobile friendliness
| Animal | Emoji | Sound |
| ---------- | --------- | --------- |
| \`Someverylongunsecablestringthatshouldmakethetableoverflow\`        | 🐶        | Woof!     |
| Cat        | 🐱        | Meow!     |
| Cow        | 🐄        | Moo       |

## Images 
------

![Some image](https://raw.githubusercontent.com/magidoc-org/magidoc/main/logo/logo_horizontal.png)
`}
  />
</body>
