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
