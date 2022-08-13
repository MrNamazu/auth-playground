import { db } from '$lib/database';
import type { RequestHandler } from "@sveltejs/kit";
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import cheerio from 'cheerio';

export const POST: RequestHandler = async ({request}) => {
  const form = await request.formData();
  const email = form.get('mail');
  const characterid = form.get('characterid');
  const fftoken = form.get('fftoken');
  
  
  if (typeof email !== 'string' || typeof characterid !== 'string' || typeof fftoken !== 'string') {
    return { 
      status: 400,
      body: {error: 'Invalid input, please check your input and try again.'}
    };
  }

  if (!email || !characterid || !fftoken) {
    return {
      status: 400,
      body: {error: 'You have to provide an email, a character id and a fftoken'}
    }
  }

  let html: any;
  let $: any;
  let charName: string;

  const crawlData = async () => {
    html = await axios(`https://de.finalfantasyxiv.com/lodestone/character/${characterid}/`)
    $ = cheerio.load(html.data);
    const bio = $('.character__selfintroduction', html.data).text();
    if (bio !== fftoken) {
      return {
        status: 400,
        body: {error: 'Your fftoken is invalid'}
      }
    }
    return $('.frame__chara__name', html.data).text();
  }

  try {
    await db.user.update({
      where: {email},
      data: {
        ffchar: await crawlData(),
        ffID: characterid,
      }
    })
  } catch (error) {
    return {
      status: 400,
      body: {error: 'Something went wrong, did you proide the correct character id?'}
    }
  }
  
  return {
    status: 200,
    body: {
      success: 'You connected your character successfully',
    }
  }
}
