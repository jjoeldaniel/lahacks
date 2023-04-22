import { Configuration, OpenAIApi } from 'openai';
import { API_KEY } from '$env/static/private';

const configuration = new Configuration({
    apiKey: API_KEY,
  });
const openai = new OpenAIApi(configuration);

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    return {
        id: params.id,
    };
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async (event) => {
        // parse the request body
        // TODO: Finish this
        const data = event.request.body;
        
        return {
            data: "this is a reply!",
        };

    }
};