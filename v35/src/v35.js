import v35Colors from "./themes/colors";
import v35Typography from "./themes/typography";

const colorDict = v35Colors;
const typography = v35Typography;

function generateColorVariants(
  colorList = "all",
  shadeValue = 500,
  componentData
) {
  const variants = [];
  const colors = colorList === "all" ? Object.keys(colorDict) : colorList;

  colors.forEach((color) => {
    if (colorDict[color] && colorDict[color][shadeValue]) {
      const variantArgs = {
        backgroundColor: colorDict[color][shadeValue],
        ...componentData.args,
      };

      variants.push({
        name: `${componentData.name} ${color.replace("35", "")} ${shadeValue}`,
        args: variantArgs,
      });
    }
  });

  return variants;
}

function generateFontSizeVariants(fontSize, componentData) {
  const variants = [];
  const fontSizes = fontSize === "all" ? Object.keys(typography) : fontSize;

  fontSizes.forEach((size) => {
    const variantArgs = {
      fontSize: typography[size],
      ...componentData.args,
    };

    variants.push({
      name: `${componentData.name} ${size}`,
      args: variantArgs,
    });
  });

  console.log(variants);

  return variants;
}

export const loadComponents = async () => {
  const storyModules = import.meta.glob("./stories/**/*.stories.js");
  const newStructure = {};

  for (const path in storyModules) {
    const module = await storyModules[path]();
    const [, type, component, fileName] =
      path.match(/\.\/stories\/(.+)\/(.+)\/(.+)\.stories\.js/) || [];
    const Component = module.default.component;

    if (Component) {
      // Check for a corresponding .v35.js file
      const v35FilePath = path.replace(".stories.js", ".v35.js");
      let themes = {};
      let order = [];

      try {
        const v35Module = await import(v35FilePath);
        themes = v35Module.themes || {};
        order = v35Module.order || [];
      } catch (error) {
        console.warn(
          `No .v35.js file found for ${path} or error loading it:`,
          error
        );
      }

      // Filter out the default export and any non-object exports
      const stories = Object.entries(module).filter(
        ([key, value]) =>
          key !== "default" && typeof value === "object" && value.args
      );

      // Initialize the structure for this component
      if (!newStructure[type]) newStructure[type] = {};
      if (!newStructure[type][component]) {
        newStructure[type][component] = {
          component: Component,
          stories: {},
        };
      }

      stories.forEach(([storyName, story]) => {
        const componentData = {
          Component,
          type,
          component,
          fileName,
          name: storyName,
          args: { ...module.default.args, ...story.args },
        };

        // Check if the story is defined in themes
        const themeProps = themes[storyName.toLowerCase()];

        if (themeProps && "backgroundColor" in themeProps) {
          // Generate color variants for themed stories
          newStructure[type][component].stories[storyName] =
            generateColorVariants(
              themeProps.backgroundColor.colors || "all",
              themeProps.backgroundColor.shade || "500",
              componentData
            );
        } else if (themeProps && "fontSize" in themeProps) {
          // Generate fontSize variants for themed stories
          newStructure[type][component].stories[storyName] =
            generateFontSizeVariants(themeProps.fontSize, componentData);
        } else {
          // Add the story without color variants
          newStructure[type][component].stories[storyName] = [
            {
              name: storyName,
              args: componentData.args,
            },
          ];
        }
      });

      // After processing all stories for this component
      if (order.length > 0) {
        // Sort the stories based on the order array
        const sortedStories = {};
        order.forEach((storyName) => {
          storyName = storyName.charAt(0).toUpperCase() + storyName.slice(1);

          if (newStructure[type][component].stories[storyName]) {
            sortedStories[storyName] =
              newStructure[type][component].stories[storyName];
          }
        });

        // Add any remaining stories that weren't in the order array
        Object.keys(newStructure[type][component].stories).forEach(
          (storyName) => {
            if (!sortedStories[storyName]) {
              sortedStories[storyName] =
                newStructure[type][component].stories[storyName];
            }
          }
        );

        // Replace the original stories object with the sorted one
        newStructure[type][component].stories = sortedStories;
      }
    } else {
      console.warn(`Component not found in ${path}`);
    }
  }

  return { newStructure };
};
