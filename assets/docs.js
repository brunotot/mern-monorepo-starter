function extractName(href) {
  const prefix = "_tsvdec_";
  const extension = "html";
  const prefixIndex = href.indexOf(prefix);
  const startIndex = href.indexOf(".", prefixIndex) + 1;
  const hrefWithoutParams = href.includes("?") ? href.substring(0, href.indexOf("?")) : href;
  const endIndex = hrefWithoutParams.length - extension.length - 1;
  return href.substring(startIndex, endIndex);
}

function getNavMap() {
  const navContainer = document.getElementById("tsd-nav-container");
  const navList = Array.from(navContainer.querySelectorAll("a"));
  return navList.reduce((out, elem) => ({ ...out, [elem.href]: elem }), {});
}

function getNameHrefMap() {
  const navMap = getNavMap();
  const hrefList = Object.keys(navMap);
  const nameHrefMap = hrefList.reduce((out, href) => ({ ...out, [extractName(href)]: href }), {});
  return nameHrefMap;
}

function search(query, nameHrefMap = getNameHrefMap()) {
  const lowercaseQuery = query.toLowerCase();
  const identifiers = Object.keys(nameHrefMap);
  const results = identifiers.filter(id => id.toLowerCase().includes(lowercaseQuery));
  return results.reduce((out, id) => ({ ...out, [id]: nameHrefMap[id] }), {});
}

function setShow(a, show) {
  const displayProp = show === true ? "flex" : "none";
  const svg = a.previousElementSibling;
  const isSvg = svg && svg.tagName.toLowerCase() === "svg";
  a.style.display = displayProp;
  if (isSvg) svg.style.display = displayProp;
}

function render(query) {
  const resultMap = search(query);
  const navMap = getNavMap();
  const navMapEntries = Object.entries(navMap);
  for (const [href, a] of navMapEntries) {
    const name = extractName(href);
    const url = new URL(href);
    url.searchParams.set("q", query);
    a.href = url.toString();
    const isMatch = name === "." || href === resultMap[name];
    setShow(a, isMatch);
  }
}

function configureSearchListener(searchInput) {
  searchInput.addEventListener("input", e => {
    const value = e.target.value;
    render(value);
  });
}

function getCurrentQuery() {
  const url = new URL(document.location.href);
  const query = url.searchParams.get("q") ?? "";
  return query;
}

function overrideTitle() {
  return;
  // generateCustomSearchInput();
  // render(getCurrentQuery());
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateCustomSearchInput() {
  const mainLink = document.querySelector(".site-menu > nav > a");
  const customSearchInput = document.createElement("input");
  customSearchInput.type = "text";
  customSearchInput.placeholder = "Search";
  customSearchInput.value = getCurrentQuery();
  customSearchInput.classList.add("custom-search-input");
  configureSearchListener(customSearchInput);
  mainLink.replaceWith(customSearchInput);
}

async function fetchUrlsAndMapResponses(hrefs) {
  const fetchPromises = hrefs.map(async href => {
    try {
      const response = await fetch(href);
      if (!response.ok) {
        throw new Error(`Network response was not ok for ${href}`);
      }
      const text = await response.text();
      return { href, text };
    } catch (error) {
      console.error("Failed to fetch content:", error);
      return { href, text: null }; // Handle errors gracefully
    }
  });

  const results = await Promise.all(fetchPromises);
  const mappedResults = results.reduce((acc, { href, text }) => {
    acc[href] = text;
    return acc;
  }, {});

  return mappedResults;
}

function getNavData() {
  const svgLinks = document.querySelectorAll(`a > svg[class="tsd-kind-icon"]`);
  return [...svgLinks].map(svg => ({
    href: svg.parentElement.href,
    a: svg.parentElement,
  }));
}

async function overrideCustomTags() {
  const navData = getNavData();
  const result = await fetchUrlsAndMapResponses(navData.map(({ href }) => href));
  CUSTOM_TAGS.forEach(tag => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const template =
      /*html*/
      `<div 
          class="tsd-kind-icon" 
          style="
            aspect-ratio: 1;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8em;
            color: ${tag.color};
            background-color: ${tag.backgroundColor};
            ${tag.outline ? `outline: ${tag.outline}` : ""};
          "
        >
          ${tag.letter}
        </div>`;

    navData.forEach(({ href, a }) => {
      const doReplace = result[href].includes(`[@${tag.name}]`);
      if (doReplace) {
        const div = document.createElement("div");
        div.innerHTML = template;
        a.replaceChild(div, a.childNodes[0]);
      }
    });
  });
}

const CUSTOM_TAGS = [
  {
    name: "Validator",
    color: "#414040",
    backgroundColor: "#ffcb3d",
    letter: "@",
  },
  {
    name: "Decorator",
    color: "#414040",
    backgroundColor: "#7fffc9",
    letter: "@",
  },
  {
    name: "Enhancer",
    color: "#ededed",
    backgroundColor: "#7354e3",
    letter: "@",
  },
  {
    name: "Override",
    color: "#ededed",
    backgroundColor: "transparent",
    letter: "⚙️",
  },
  {
    name: "Translation",
    color: "#ededed",
    backgroundColor: "transparent",
    letter: "🌐",
  },
  /*{
      name: "Event",
      color: "#ededed",
      backgroundColor: "transparent",
      letter: "🗓",
    },
    {
      name: "Validation",
      color: "#ededed",
      backgroundColor: "transparent",
      letter: "✅",
    },
    {
      name: "Utility",
      color: "#ededed",
      backgroundColor: "transparent",
      letter: "🔧",
    },
    {
      name: "Strategy",
      color: "#ededed",
      backgroundColor: "transparent",
      letter: "♟️",
    },
    {
      name: "Reflection",
      color: "#ededed",
      backgroundColor: "transparent",
      letter: "📁",
    },*/
];

function overrideTooltips() {
  [...document.querySelectorAll("a[href] > svg + span")].forEach(elem => {
    const text = elem.textContent;
    const anchor = elem.parentElement;
    anchor.title = text;
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function overrideRemoveViteModule() {
  const viteModule = document.querySelector(
    `li:has(> a[data-id="/modules/frontend_src_vite_env.html"])`,
  );
  if (viteModule) {
    viteModule.remove();
  }
}

window.onload = async function () {
  overrideTitle();
  overrideTooltips();
  await overrideCustomTags();
  //overrideRemoveViteModule();
  document.body.classList.add("show");
};
