import { db } from '$lib/database';
import type { RequestHandler } from "@sveltejs/kit";
import * as bcrypt from 'bcrypt';
import * as cookie from 'cookie';

export const POST: RequestHandler = async ({request}) => {
  const form = await request.formData();
  const email = form.get('mail');
  const password = form.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return { 
      status: 400,
      body: {error: 'Invalid input, please check your input and try again.'}
    };
  }
  if (!email || !password) {
    return {
      status: 400,
      body: {error: 'You have to provide an email and password'}
    }
  }

  const user = await db.user.findUnique({
    where: {email}
  })
  const passwordMatch = user && await bcrypt.compare(password, user.passwordHash)

  if (!email || !passwordMatch) {
    return {
      status: 400,
      body: {error: 'Your E-Mail or Password is invalid'}
    }
  }

  return {
    status: 200,
    body: {
      email: {email},
      success: 'You have successfully signed in',
    },
    redirect: '/',
    headers: {
      'Set-Cookie': cookie.serialize('session', user.id, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
      }),
    }
  }
}