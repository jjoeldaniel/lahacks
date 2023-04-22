const { Configuration, OpenAIApi } = require("openai");
import { API_KEY } from '$env/static/private';

const configuration = new Configuration({
    apiKey: API_KEY,
  });
const openai = new OpenAIApi(configuration);

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return {
        id: params.id
    };
}
