module.exports = function (eleventyConfig) {
  // --- Static passthrough (no build step needed for these) ---
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // --- Watch CSS for local dev ---
  eleventyConfig.addWatchTarget("src/css");

  // --- Filters ---
  // RFC-3339 / ISO date, used by the Atom feed and anywhere we need a
  // machine-readable date. No extra date library required.
  eleventyConfig.addFilter("dateISO", (dateObj) => {
    return new Date(dateObj).toISOString();
  });

  // Human-readable date, e.g. "3 March 2026"
  eleventyConfig.addFilter("dateReadable", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  // Short excerpt for listing pages when a page has no explicit "summary"
  eleventyConfig.addFilter("excerpt", (content, length = 220) => {
    if (!content) return "";
    const text = String(content).replace(/(<([^>]+)>)/gi, "");
    return text.length > length ? text.slice(0, length).trim() + "…" : text;
  });

  // Table of contents: given a rendered article/guide body, inject a
  // stable id onto every <h2>/<h3> and return { html, items }, where items
  // is a flat [{ level, text, slug }] list for rendering a "Contents" box.
  // A regex pass rather than a full HTML parser — article/guide bodies are
  // single-level markdown output, so this stays reliable without adding a
  // dependency. Slugs reuse Eleventy's own built-in slugify filter, so a
  // heading's anchor matches the same slugging already used for tag URLs.
  eleventyConfig.addFilter("withToc", function (html) {
    if (!html) return { html: html || "", items: [] };
    const slugify = eleventyConfig.getFilter("slugify");
    const seen = new Map();
    const items = [];
    const withIds = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/g, (match, level, attrs, inner) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (!text) return match;
      let slug = slugify(text) || "section";
      const count = seen.get(slug) || 0;
      seen.set(slug, count + 1);
      if (count > 0) slug = `${slug}-${count + 1}`;
      items.push({ level: Number(level), text, slug });
      const idAttr = attrs.includes(" id=") ? "" : ` id="${slug}"`;
      return `<h${level}${idAttr}${attrs}>${inner}</h${level}>`;
    });
    return { html: withIds, items };
  });

  // --- Collections ---
  // Knowledgebase: how-to / reference documents, newest first.
  eleventyConfig.addCollection("knowledgebase", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/knowledgebase/*.md").sort((a, b) => b.date - a.date);
  });

  // Articles: blog-style writing, newest first.
  eleventyConfig.addCollection("articles", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/articles/*.md").sort((a, b) => b.date - a.date);
  });

  // Unique knowledgebase tags (excluding the structural "knowledgebase" tag
  // every guide gets from knowledgebase.json), sorted alphabetically. Powers
  // the tag pages under /knowledgebase/tags/ and the sitemap.
  eleventyConfig.addCollection("knowledgebaseTags", (collectionApi) => {
    const guides = collectionApi.getFilteredByGlob("src/knowledgebase/*.md");
    const tags = new Set();
    guides.forEach((guide) => {
      (guide.data.tags || []).forEach((tag) => {
        if (tag !== "knowledgebase") tags.add(tag);
      });
    });
    return [...tags].sort();
  });

  // Recent: knowledgebase + articles combined, newest first, capped for the homepage.
  eleventyConfig.addCollection("recent", (collectionApi) => {
    const combined = [
      ...collectionApi.getFilteredByGlob("src/knowledgebase/*.md"),
      ...collectionApi.getFilteredByGlob("src/articles/*.md"),
    ];
    return combined.sort((a, b) => b.date - a.date).slice(0, 3);
  });

  // Feed items: same merge, uncapped (well, capped generously) for the Atom feed.
  eleventyConfig.addCollection("feedItems", (collectionApi) => {
    const combined = [
      ...collectionApi.getFilteredByGlob("src/knowledgebase/*.md"),
      ...collectionApi.getFilteredByGlob("src/articles/*.md"),
    ];
    return combined.sort((a, b) => b.date - a.date).slice(0, 30);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["njk", "md", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
