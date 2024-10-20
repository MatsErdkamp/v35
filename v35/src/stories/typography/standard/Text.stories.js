import { Text } from "./Text";

export default {
  title: "Typography/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    content: { control: "text" },
    fontSize: {
      control: { type: "select" },
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Size = {
  args: {
    content: "Hello, world!",
  },
};
