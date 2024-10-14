import { addons } from "@storybook/manager-api";
import theme35 from "./theme35";

addons.setConfig({
  theme: theme35,
});

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: theme35, // Apply your custom theme to the docs
    },
  },
};

export default preview;
