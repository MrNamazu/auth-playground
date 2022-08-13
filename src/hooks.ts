import { db } from "$lib/database";
import type { GetSession, Handle } from "@sveltejs/kit";
import * as cookie from 'cookie';

export const handle: Handle = async ({ event, resolve }) => {
  const cookieHeader = event.request.headers.get('cookie');
  const cookies = cookie.parse(cookieHeader ?? '');

  if (!cookies.session) {
    return await resolve(event)
  }

  const dbuser = await db.user.findUnique({
    where: { id: cookies.session }
  })

  if (dbuser) {
    event.locals.user = {
      email: dbuser.email,
      fftoken: dbuser.fftoken,
      ffchar: dbuser.ffchar,
      ffid: dbuser.ffID, 
    }
  }
  return await resolve(event)
}

export const getSession: GetSession = ({ locals }) => {
  if (!locals.user) return {}
  return {
    user: {
      email: locals.user.email,
      fftoken: locals.user.fftoken,
      ffchar: locals.user.ffchar, 
      ffid: locals.user.ffid, 
    }
  }
}