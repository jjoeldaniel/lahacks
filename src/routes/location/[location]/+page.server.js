import { Configuration, OpenAIApi } from 'openai';
import { API_KEY } from '$env/static/private';

// import showdown
import showdown from 'showdown';

const configuration = new Configuration({
    apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

async function gpt(prompt) {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful travel assistance" },
            { role: "user", content: prompt },
        ],
    });

    return completion.data.choices[0].message?.content;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const loc = params.location;
    const city = loc.split(',')[0];

    const second = loc.split(',')[1];
    const county = second.split(' ')[1];
    const state_id = second.split(' ')[2];

    let about = await gpt("Use markdown and generate a brief description, historical summary, and list of fun activities about the city of " + city + ", " + county + " " + state_id);

    let converter = new showdown.Converter();
    let html = converter.makeHtml(about);

    return {
        props: {
            city,
            county,
            state_id,
            html,
        }
    }
}