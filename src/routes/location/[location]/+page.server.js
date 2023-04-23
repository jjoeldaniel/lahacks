import { Configuration, OpenAIApi } from 'openai';
import { API_KEY } from '$env/static/private';

const configuration = new Configuration({
    apiKey: API_KEY,
  });
const openai = new OpenAIApi(configuration);

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const loc = params.location;
    const city = loc.split(',')[0];

    const second = loc.split(',')[1];
    const county = second.split(' ')[1];
    const state_id = second.split(' ')[2];

    return {
        props: {
            city,
            county,
            state_id
        }
    };
}