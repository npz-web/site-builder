import { getCollection } from "astro:content";

const homepage = (await getCollection("homepage")) || [];
const pages = (await getCollection("pages")) || [];

const menuItems = [...homepage, ...pages]
  .sort((a, b) => {
    const idA = a.data.sortID || 0;
    const idB = b.data.sortID || 0;
    return idA - idB;
  })
  .flatMap((page) => {
    if (
      page.data.publishStatus === "unlisted" ||
      page.data.publishStatus === "unpublished"
    ) {
      return [];
    }
    // console.log(page);
    if (page.data?.customNavigation?.discriminant) {
      // page has customNav;
      const customNav = page.data.customNavigation.value;

      return customNav.map(
        (
          customNavItem: { title: string; subItems: string },
          itemIndex: number
        ) => {
          const workingSlug = page.slug === "index" ? "" : page.slug + "/";
          return {
            url:
              "/" +
              workingSlug +
              (itemIndex === 0
                ? "#main-content"
                : "#section-" + customNavItem.subItems),

            title: customNavItem.title || page.data.title ,
            showInMenu: true,
          };
        }
      );
    } else {
      if (page.collection === "homepage") {
        return {
          url: "/",
          title: page.data.title || "Home",
          showInMenu: false,
          subItems: [],
        };
      } else {
        return {
          url: "/" + page.slug + "/",
          title: page.data.title,
          showInMenu: page.data.publishStatus === "published",
          subItems: [],
        };
      }
    }
  })
  .filter((page) => {
    return page.showInMenu;
  });

export default menuItems;
