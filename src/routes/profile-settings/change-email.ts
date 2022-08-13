import { db } from '$lib/database';
import type { RequestHandler } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';

export const POST: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  const password = form.get('password');
  const newemail = form.get('email');
  const email = form.get('oldmail');

  if (typeof password !== 'string' || typeof newemail !== 'string' || typeof email !== 'string') {
    return {
      status: 400,
      body: { error: 'Invalid input, please check your input and try again.' },
    };
  }

  if (!password || !newemail || !email) {
    return {
      status: 400,
      body: { error: 'You have to provide your password and new email adress' },
    };
  }
  const user = await db.user.findUnique({
    where: {email}
  })
  const passwordMatch = user && await bcrypt.compare(password, user.passwordHash)
  
  if (!passwordMatch) {
    return {
      status: 400,
      body: {error: 'Your password is invalid'}
    }
  }

  try {
    await db.user.update({
      where: {email},
      data: {
        email: newemail,
      }
    })
  } catch (error) {
    return {
      status: 400,
      body: {error: 'smth went wrong'}
    }
  }
  return {
    status: 200,
    body: {
      success: 'You have successfully changed your email',
    }
  }
}