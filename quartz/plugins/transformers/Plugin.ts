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
    <title>Obsidian Tabs to HTML</title>
    <style>
        .tab {
            overflow: hidden;
            border: 1px solid #ccc;
            background-color: #f1f1f1;
        }
        .tab button {
            background-color: inherit;
            float: left;
            border: none;
            outline: none;
            cursor: pointer;
            padding: 14px 16px;
            transition: 0.3s;
        }
        .tab button:hover {
            background-color: #ddd;
        }
        .tab button.active {
            background-color: #ccc;
        }
        .tabcontent {
            display: none;
            padding: 6px 12px;
            border: 1px solid #ccc;
            border-top: none;
        }
    </style>
</head>
<body>

<div id="tabs" class="tab"></div>
<div id="content"></div>

<script>
// Example input simulating Obsidian Tabs plugin format
const input = `
\`\`\`tabs
tab: TAB ONE
Tab content for TAB ONE

tab: TAB TWO
Tab content for TAB TWO

tab: TAB THREE
Tab content for TAB THREE
\`\`\`
`;

// Function to parse the input and create tabs
function createTabs(${node.value}) {
    const tabContainer = document.getElementById('tabs');
    const contentContainer = document.getElementById('content');

    // Extracting tab definitions from the input
    const tabDefinitions = input.match(/tab:\s*(.*?)\n(.*?)(?=\ntab:|$)/gs);

    tabDefinitions.forEach((def, index) => {
        const lines = def.split('\n');
        const title = lines[0].replace(/tab:\s*/, '').trim(); // Tab title
        const content = lines.slice(1).join('\n').trim(); // Tab content
        
        // Create tab button
        const button = document.createElement('button');
        button.innerText = title;
        button.className = 'tablinks';
        button.onclick = function(event) {
            openTab(event, `content${index}`);
        };
        tabContainer.appendChild(button);

        // Create tab content div
        const tabContent = document.createElement('div');
        tabContent.id = `content${index}`;
        tabContent.className = 'tabcontent';
        tabContent.innerHTML = content.replace(/"/g, '').trim(); // Remove quotes from content
        contentContainer.appendChild(tabContent);
    });

    // Activate the first tab by default
    if (tabContainer.children.length > 0) {
        tabContainer.children[0].click();
    }
}

// Function to open a specific tab
function openTab(evt, contentId) {
    var i, tabcontent, tablinks;

    // Hide all tab contents
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the "active" class from all buttons
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and add an "active" class to the button that opened the tab
    document.getElementById(contentId).style.display = "block";
    evt.currentTarget.className += " active";
}

// Initialize tabs from input
createTabs(${node.value});
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
