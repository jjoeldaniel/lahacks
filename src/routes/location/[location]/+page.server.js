import { Configuration, OpenAIApi } from 'openai';
import { API_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js'
import { DB_URL, DB_KEY } from '$env/static/private';
import showdown from 'showdown';

const openai = new OpenAIApi(new Configuration({
    apiKey: API_KEY}));

async function addGptContent(locationName, gptContent) {
    const supabase = createClient(DB_URL, DB_KEY);
    
    const { data, error } = await supabase
    .from('cache')
    .insert([{ location_name: locationName, gpt_content: gptContent }])
    }

async function getGptContent(locationName) {
    const supabase = createClient(DB_URL, DB_KEY);
    
    const { data, error } = await supabase
    .from('cache')
    .select('location_name')
    .eq('location_name', locationName)
    
    // return true if found
    return data;
    }
      
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
    const name = (city + "-" + county + "-" + state_id).toLowerCase();

    const stored_value = await getGptContent(name);
    if (stored_value) {
        return {
            props: {
                city,
                county,
                state_id,
                html: stored_value,
            }
        }
    }

    let about = await gpt("Use markdown and generate a brief description, historical summary, and list of fun activities about the city of " + city + ", " + county + " " + state_id);

    let converter = new showdown.Converter();
    let html = converter.makeHtml(about);

    // // add to cache
    // await addGptContent(name, html);

    return {
        props: {
            city,
            county,
            state_id,
            html,
        }
    }
}