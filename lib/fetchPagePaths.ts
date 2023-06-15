import sanityConfig from "./sanityConfig";
import axios from "axios";

const fetchPagePaths = async (query: string) => {
    let url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(query)}`;
    try {
        const response = await axios.get(url, {
            headers: {'Content-Type': 'application/json'}
        });
        return response.data.result.map((page: { name: string }) => ({
            params: {name: page.name.toLowerCase()},
        }));
    } catch (error) {
        console.error('Error fetching page paths:', error);
        throw error;
    }
}

export default fetchPagePaths;