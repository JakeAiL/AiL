import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { visit } from "unist-util-visit"

export const Plugin: QuartzTransformerPlugin = () => ({
  name: "Plugin",
  markdownPlugins() {
    return [
      () => (tree: Root, _file) => {
        visit(tree, "code", (node) => {
          if (node.lang === "tabs") {
            node.type = "html" as "code"
            node.value = `<p> 
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Content Card with Tabs</title>
</head>
<body style="font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background-color: #f0f0f0;">
    <div style="width: 300px; background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="display: flex; border-bottom: 1px solid #e0e0e0;">
            <button onclick="showTab(1)" style="flex: 1; padding: 10px; border: none; background-color: #f8f8f8; cursor: pointer; border-top-left-radius: 8px;">Tab 1</button>
            <button onclick="showTab(2)" style="flex: 1; padding: 10px; border: none; background-color: #f8f8f8; cursor: pointer;">Tab 2</button>
            <button onclick="showTab(3)" style="flex: 1; padding: 10px; border: none; background-color: #f8f8f8; cursor: pointer; border-top-right-radius: 8px;">Tab 3</button>
        </div>
        <div id="tab1" style="padding: 20px;">
            <h2 style="margin-top: 0;">Tab 1 Content</h2>
            <p>This is the content for Tab 1. You can put any information here.</p>
        </div>
        <div id="tab2" style="padding: 20px; display: none;">
            <h2 style="margin-top: 0;">Tab 2 Content</h2>
            <p>This is the content for Tab 2. It's currently hidden but will show when Tab 2 is clicked.</p>
        </div>
        <div id="tab3" style="padding: 20px; display: none;">
            <h2 style="margin-top: 0;">Tab 3 Content</h2>
            <p>This is the content for Tab 3. It's also hidden initially.</p>
        </div>
    </div>

    <script>
        function showTab(tabNumber) {
            // Hide all tabs
            document.getElementById('tab1').style.display = 'none';
            document.getElementById('tab2').style.display = 'none';
            document.getElementById('tab3').style.display = 'none';

            // Show the selected tab
            document.getElementById('tab' + tabNumber).style.display = 'block';

            // Update button styles
            const buttons = document.getElementsByTagName('button');
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].style.backgroundColor = '#f8f8f8';
                buttons[i].style.fontWeight = 'normal';
            }
            buttons[tabNumber - 1].style.backgroundColor = 'red';
            buttons[tabNumber - 1].style.fontWeight = 'bold';
        }

        // Show the first tab by default
        showTab(1);
    </script>
</body>
</html>
</p>`
          }
        })
      },
    ]
  },
})
