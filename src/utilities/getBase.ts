const GetApiBase = async (): Promise<{ site: string; api: string }> => {
    try {
      const res = await fetch(`${process.env.PUBLIC_URL}/config.json`);
      if (!res.ok) {
        throw new Error("Failed to load config.json");
      }
      const config = await res.json();
      const siteUrl = config.base_url["*"];
      const apiUrl = config.base_url_api;
      return { site: siteUrl, api: apiUrl };
    } catch (error) {
      console.error("Error in getApiBase:", error);
      return {
        site: "http://api.samizco.ir",
        api: "http://api.samizco.ir/api",
      };
    }
  };
  export default GetApiBase;