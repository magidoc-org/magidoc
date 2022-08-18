export function load(): LayoutLoadOutput {
  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292693)");
  return {
    stuff: {
      homeUrl: homePageUrl,
    },
    props: {
      content: pages,
      meta: siteMeta,
    },
  }
}
