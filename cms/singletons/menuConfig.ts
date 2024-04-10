import { singleton, fields } from "@keystatic/core";
import { customFields } from "../fields";

export const menuConfig = singleton({
  label: "Menu",
  format: { data: "json" },
  path: "src/settings/menu",
  schema: {
    position: fields.conditional(
      fields.select({
        label: "Menu Position",
        options: [
          { label: "Side", value: "side" },
          { label: "Top", value: "top" },
        ],
        defaultValue: "side",
      }),
      {
        side: fields.object({
          u: customFields.uniquify({ label: "u" }),
          layout: fields.object(
            { width: customFields.cssFlex({ label: "Width" }) },
            { label: "Layout" }
          ),
        }),
        top: fields.object({
          u: customFields.uniquify({ label: "u" }),

          menuBarText: fields.text({
            label: "Menu Bar Text",
            description:
              "The line of text that appears on the left side of the menu bar. Probably your name",
          }),
          alwaysDropdown: fields.checkbox({
            label: "Always use Dropdown",
            description:
              "Use the mobile-style (hamburger) navigation regardless of screen size",
          }),
        }),
      }
    ),
    appearance: fields.object({
      blurBehind: fields.checkbox({ label: "Blur behind menu" }),
    }),
    sizes: fields.object({
      topBarHeight: customFields.cssUnit({
        label: "minimum height for menu when it appears as a top bar",
        defaultValue: "45px",
        limitUnits: ["px", "rem"],
      }),
      topBarPadding: customFields.cssUnit({
        label: "Padding on sides of Top Bar",
        defaultValue: "0.5rem",
        limitUnits: ["px", "rem"],
      }),
      // hamburgerSize: customFields.cssUnit({ label: "Hamburger Button Size" }),
    }),
    colors: fields.object(
      {
        backgroundColor: customFields.colorPicker({
          label: "Background Color",
          allowAlpha: true,
        }),
        menuHoverColor: customFields.colorPicker({
          label: "Main Hover Color",
          allowAlpha: true,
        }),

        dropdownColor: customFields.colorPicker({
          label: "Dropdown Color",
          allowAlpha: true,
        }),
        dropdownHoverColor: customFields.colorPicker({
          label: "Dropdown Hover Color",
          allowAlpha: true,
        }),
      },
      { layout: [3, 3, 3, 3] }
    ),
    typography: fields.object({
      menuMain: customFields.typeProps({ label: "Main menu items" }),
      menuSub: customFields.typeProps({ label: "Sub-items" }),
      menuText: customFields.typeProps({ label: "Menu Bar text" }),
    }),
  },
});
