import {
  config,
  fields,
  collection,
  singleton,
  type BasicFormField,
  BlockWrapper,
} from "@keystatic/core";
import { block, repeating, wrapper } from "@keystatic/core/content-components";
import { Icon } from "@keystar/ui/icon";

import { menuConfig } from "./cms/singletons/menuConfig";
import { generalSettings } from "./cms/singletons/generalSettings";

import { typeOptions } from "./cms/singletons/typeOptions";
import { fonts } from "./cms/singletons/fonts";
import * as customFields from "./cms/fields";
import { standardComponents } from "./cms/components/standardComponents";
import { pageComponents } from "./cms/components/pageComponents";
import { hammerIcon } from "@keystar/ui/icon/icons/hammerIcon";

const customNavField = fields.conditional(
  fields.checkbox({
    label: "Show Sub-Items in Nav",
    description:
      "Use this option to show project pages beneath this page in the site navigation",
  }),
  {
    false: customFields.uniquify({ label: "unique" }),
    true: fields.array(
      fields.object({
        title: fields.text({ label: "Nav item label" }),
        subItems: fields.relationship({
          label: "Nav sub-items",
          collection: "portfolioGroups",
        }),
      }),
      {
        itemLabel(props) {
          return (
            props.fields.title.value +
            (props.fields.subItems.value
              ? ` (sub-items: ${props.fields.subItems.value})`
              : "")
          );
        },
      },
    ),
  },
);

export default config({
  ui: {
    brand: {
      name: "portfolio-builder v1.0",
      mark: () => {
        return <Icon src={hammerIcon} />;
      },
    },
    navigation: {
      Content: ["pages", "homepage"],
      "Layout/Appearance": [
        "menu",
        "typeOptions",
      ],
      Settings: ["fonts", "general"],
    },
  },
  storage: {
    kind: "local",
  },
  collections: {
    pages: collection({
      label: "Pages",
      slugField: "title",
      previewUrl: "/{slug}",
      path: "src/content/pages/*",
      entryLayout: "content",
      columns: ["sortID", "publishStatus"],
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        hideTitle: fields.checkbox({
          label: "Hide Title",
          defaultValue: false,
          description:
            "Remove default title element from this page (make sure to include a Heading 1 near the top of the page for accessibility!)",
        }),
        sortID: fields.number({
          label: "Sort ID",
          description:
            "this number is used to figure out the order for the site menu",
        }),
        publishStatus: fields.select({
          label: "Published?",
          description:
            'Published means the page is publicly visible and will appear in the "all" portfolio type. Unpublished means the page is completely hidden. Unlisted means the page will be published, but will not be placed in any menus or portfolios unless specifically selected.',
          defaultValue: "published",
          options: [
            { label: "Yes", value: "published" },
            { label: "No", value: "unpublished" },
            { label: "Unlisted", value: "unlisted" },
          ],
        }),
        customNavigation: customNavField,

        content: fields.markdoc({
          label: "Content",
          components: {
            ...standardComponents,
            ...pageComponents,
          },
          options: {
            table: false,

            image: {
              directory: "src/assets/images/pages",
              publicPath: "../../assets/images/pages/",
            },
          },
        }),
      },
    }),
  },
  singletons: {
    typeOptions: typeOptions,
    general: generalSettings,
    menu: menuConfig,
    fonts: fonts,
    homepage: singleton({
      label: "Homepage",
      entryLayout: "content",
      previewUrl: "/",
      format: { contentField: "content" },
      path: "src/content/homepage/index",
      schema: {
        title: fields.text({ label: "Page Title" }),
        hideTitle: fields.checkbox({
          label: "Hide Title",
          defaultValue: false,
          description:
            "Remove default title element from this page (make sure to include a Heading 1 near the top of the page for accessibility!)",
        }),
        sortID: fields.number({
          label: "Sort ID",
          description:
            "this number is used to figure out the order for the site menu",
        }),
        customNavigation: customNavField,

        content: fields.markdoc({
          label: "Content",
          components: {
            ...standardComponents,
            ...pageComponents,
          },
          options: {
            table: false,

            image: {
              directory: "src/assets/images/pages",
              publicPath: "../../assets/images/pages/",
            },
          },
        }),
      },
    }),
  },
});
